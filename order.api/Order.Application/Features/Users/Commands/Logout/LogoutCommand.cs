using MediatR;

namespace Order.Application.Features.Users.Commands.Logout;

public class LogoutCommand : IRequest<bool>
{
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
}