using MediatR;
using Order.Application.ViewModels;

namespace Order.Application.Features.Users.Queries;

public class GetUserQuery : IRequest<UserViewModel>
{
    public int UserId { get; set; }
}