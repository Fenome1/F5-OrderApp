using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class GuestViewModel : IMapWith<Guest>
{
    public int GuestId { get; set; }

    public required string Email { get; set; }
}