using MediatR;
using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.Features.Users.Commands.Create;

public class CreateUserCommand : IRequest<int>, IMapWith<User>
{
    public string Login { get; set; }
    public string Password { get; set; }
    public int Role { get; set; }
}