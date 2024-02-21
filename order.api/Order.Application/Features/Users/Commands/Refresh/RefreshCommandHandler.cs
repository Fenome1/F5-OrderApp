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

public class RefreshCommandHandler(OrderDbContext context, ITokenService tokenService, IMapper mapper)
    : IRequestHandler<RefreshCommand, AuthResultViewModel>
{
    public async Task<AuthResultViewModel> Handle(RefreshCommand request, CancellationToken cancellationToken)
    {
        var principal = tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
        var nameIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

        if (nameIdClaim is null || !int.TryParse(nameIdClaim.Value, out var userId))
            throw new NotFoundException(nameof(nameIdClaim));

        var user = await context.Users
            .Include(u => u.RoleNavigation)
            .Include(u => u.RefreshToken)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (request.RefreshToken != user.RefreshToken?.Token)
            throw new NotFoundException("Invalid Token");

        var userViewModel = mapper.Map<UserViewModel>(user);

        if (DateTime.Now >= user.RefreshToken.ExpirationDate)
        {
            var newRefreshToken = tokenService.GenerateRefreshToken(user.UserId);
            var newAccessToken = tokenService.GenerateAccessToken(user);

            context.RefreshTokens.Update(newRefreshToken);
            await context.SaveChangesAsync(cancellationToken);

            return new AuthResultViewModel()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken.Token,
                User = userViewModel
            };
        }

        return new AuthResultViewModel()
        {
            AccessToken = tokenService.GenerateAccessToken(user),
            RefreshToken = user.RefreshToken.Token,
            User = userViewModel
        };
    }
}