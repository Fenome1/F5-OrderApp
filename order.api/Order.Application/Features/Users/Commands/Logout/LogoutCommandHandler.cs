using System.Security.Claims;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Application.Common.Interfaces;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Logout;

public class LogoutCommandHandler : IRequestHandler<LogoutCommand, bool>
{
    private readonly OrderDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public LogoutCommandHandler(OrderDbContext context, ITokenService tokenService, IMapper mapper)
    {
        _context = context;
        _tokenService = tokenService;
        _mapper = mapper;
    }

    public async Task<bool> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.AccessToken) || string.IsNullOrWhiteSpace(request.RefreshToken))
            throw new NotFoundException(nameof(request));

        var principal = _tokenService.GetPrincipalFromExpiredToken(request.AccessToken);
        var nameIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

        if (nameIdClaim is null || !int.TryParse(nameIdClaim.Value, out var userId))
            throw new NotFoundException(nameof(nameIdClaim));

        var user = await _context.Users
            .Include(u => u.RefreshToken)
            .FirstOrDefaultAsync(u => u.UserId == userId);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (user.RefreshToken is null)
            throw new NotFoundException(nameof(user.RefreshToken));

        _context.RefreshTokens.Remove(user.RefreshToken);

        return await _context.SaveChangesAsync(cancellationToken) > 0;
    }
}