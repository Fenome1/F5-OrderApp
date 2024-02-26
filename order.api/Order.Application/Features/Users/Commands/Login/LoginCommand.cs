using MediatR;
using Order.Application.ViewModels;

namespace Order.Application.Features.Users.Commands.Login;

public class LoginCommand : IRequest<AuthResultViewModel>
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}