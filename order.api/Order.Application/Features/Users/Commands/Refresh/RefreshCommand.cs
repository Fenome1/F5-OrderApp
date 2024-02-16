using MediatR;
using Order.Application.ViewModels;

namespace Order.Application.Features.Users.Commands.Refresh;

public class RefreshCommand : IRequest<AuthResultViewModel>
{
    public required string AccessToken { get; set; }
    public required string RefreshToken { get; set; }
}