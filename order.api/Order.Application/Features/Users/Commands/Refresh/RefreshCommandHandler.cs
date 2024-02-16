using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Order.Application.Common.Exceptions;
using Order.Application.Common.Interfaces;
using Order.Application.Features.Users.Commands.Login;
using Order.Application.ViewModels;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Refresh;

public class RefreshCommandHandler : IRequestHandler<RefreshCommand, AuthResultViewModel>
{
    private readonly OrderDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public RefreshCommandHandler(OrderDbContext context, ITokenService tokenService, IMapper mapper)
    {
        _context = context;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<AuthResultViewModel> Handle(RefreshCommand request, CancellationToken cancellationToken)
    {
        var principal = _tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
        var nameIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

        if (nameIdClaim is null || !int.TryParse(nameIdClaim.Value, out var userId))
            throw new NotFoundException(nameof(nameIdClaim));

        var user = await _context.Users
            .Include(u => u.RoleNavigation)
            .Include(u => u.RefreshToken)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (request.RefreshToken != user.RefreshToken?.Token)
            throw new NotFoundException("Invalid Token");

        var userViewModel = _mapper.Map<UserViewModel>(user);

        if (DateTime.Now >= user.RefreshToken.ExpirationDate)
        {
            var newRefreshToken = _tokenService.GenerateRefreshToken(user.UserId);
            var newAccessToken = _tokenService.GenerateAccessToken(user);

            _context.RefreshTokens.Update(newRefreshToken);
            await _context.SaveChangesAsync(cancellationToken);

            return new AuthResultViewModel()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token,
                UserViewModel = userViewModel
            };
        }

        return new AuthResultViewModel()
        {
            AccessToken = _tokenService.GenerateAccessToken(user),
            RefreshToken = user.RefreshToken.Token,
            UserViewModel = userViewModel
        };
    }
}