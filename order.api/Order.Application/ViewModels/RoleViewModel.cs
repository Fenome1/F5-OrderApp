using AutoMapper;
using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class RoleViewModel : IMapWith<Role>
{
    public int RoleId { get; set; }

    public string Title { get; set; } = null!;
    
}