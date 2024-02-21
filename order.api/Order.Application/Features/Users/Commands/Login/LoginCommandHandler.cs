using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Interfaces;
using Order.Application.ViewModels;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Login;

public class LoginCommandHandler(
    OrderDbContext context,
    IPasswordHasher passwordHasher,
    ITokenService tokenService,
    IMapper mapper)
    : IRequestHandler<LoginCommand, AuthResultViewModel>
{
    public async Task<AuthResultViewModel> Handle(LoginCommand command, CancellationToken cancellationToken)
    {
        var user = await context.Users
            .Include(u => u.RefreshToken)
            .Include(u => u.RoleNavigation)
            .FirstOrDefaultAsync(u => u.Login == command.Login,
                cancellationToken);

        if (user is null)
            throw new Exception("Не верный логин или пароль");

        if (!passwordHasher.Check(command.Password, user.Password))
            throw new Exception("Не верный логин или пароль");

        var token = tokenService.GenerateAccessToken(user);
        var refreshToken = tokenService.GenerateRefreshToken(user.UserId);

        await context.AddAsync(refreshToken, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        var userViewModel = mapper.Map<UserViewModel>(user);

        return new AuthResultViewModel
        {
            AccessToken = token,
            RefreshToken = user.RefreshToken.Token,
            User = userViewModel
        };
    }
}