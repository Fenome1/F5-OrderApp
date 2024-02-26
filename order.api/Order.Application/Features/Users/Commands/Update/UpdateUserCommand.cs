using MediatR;
using Order.Application.Common.Mappings;
using Order.Application.ViewModels;
using Order.Core.Models;

namespace Order.Application.Features.Users.Commands.Update;

public class UpdateUserCommand : IRequest<UserViewModel>, IMapWith<User>
{
    public required int UserId { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? MiddleName { get; set; }
}