using AutoMapper;
using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class UserViewModel : IMapWith<User>
{
    public required int UserId { get; set; }
    public required string Email { get; set; }
    public string? FirstName { get; set; }
    public string? SecondName { get; set; }
    public string? MiddleName { get; set; }
    public required RoleViewModel Role { get; set; }

    public void Map(Profile profile)
    {
        profile.CreateMap<User, UserViewModel>()
            .ForMember(viewModel => viewModel.Role,
                expression => expression.MapFrom(u => u.RoleNavigation))
            .ReverseMap();
    }
}