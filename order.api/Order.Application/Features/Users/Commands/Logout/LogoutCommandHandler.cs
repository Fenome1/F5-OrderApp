using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Application.Common.Interfaces;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Logout;

public class LogoutCommandHandler(OrderDbContext context, ITokenService tokenService, IMapper mapper)
    : IRequestHandler<LogoutCommand, bool>
{
    private readonly IMapper _mapper = mapper;

    public async Task<bool> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.AccessToken) || string.IsNullOrWhiteSpace(request.RefreshToken))
            throw new NotFoundException(nameof(request));

        var principal = tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
        var nameIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

        if (nameIdClaim is null || !int.TryParse(nameIdClaim.Value, out var userId))
            throw new NotFoundException(nameof(nameIdClaim));

        var user = await context.Users
            .Include(u => u.RefreshToken)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (user.RefreshToken is null)
            throw new NotFoundException(nameof(user.RefreshToken));

        context.RefreshTokens.Remove(user.RefreshToken);

        return await context.SaveChangesAsync(cancellationToken) > 0;
    }
}