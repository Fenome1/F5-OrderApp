using System.Security.Claims;
using Order.Core.Models;

namespace Order.Application.Common.Interfaces;

public interface ITokenService
{
    ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken);
    string GenerateAccessToken(User user);
    RefreshToken GenerateRefreshToken(int userId);
}