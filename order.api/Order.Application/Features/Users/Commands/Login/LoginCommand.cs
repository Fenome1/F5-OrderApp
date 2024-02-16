using MediatR;
using Order.Application.ViewModels;

namespace Order.Application.Features.Users.Commands.Login;

public class LoginCommand : IRequest<AuthResultViewModel>
{
    public required string Login { get; set; }
    public required string Password { get; set; }
}