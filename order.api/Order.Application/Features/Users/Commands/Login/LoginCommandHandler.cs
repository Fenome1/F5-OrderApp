using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Interfaces;
using Order.Application.ViewModels;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResultViewModel>
{
    private readonly OrderDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;

    public LoginCommandHandler(OrderDbContext context, IPasswordHasher passwordHasher, ITokenService tokenService,
        IMapper mapper)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<AuthResultViewModel> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .Include(u => u.RefreshToken)
            .Include(u => u.RoleNavigation)
            .FirstOrDefaultAsync(u => u.Login == command.Login,
                cancellationToken);

        if (user is null)
            throw new Exception("Не верный логин или пароль");

        if (!_passwordHasher.Check(command.Password, user.Password))
            throw new Exception("Не верный логин или пароль");

        var token = _tokenService.GenerateAccessToken(user);
        var refreshToken = _tokenService.GenerateRefreshToken(user.UserId);

        await _context.AddAsync(refreshToken, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var userViewModel = _mapper.Map<UserViewModel>(user);

        return new AuthResultViewModel
        {
            AccessToken = token,
            RefreshToken = user.RefreshToken.Token,
            User = userViewModel
        };
    }
}