using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class GuestOrderViewModel : IMapWith<GuestOrder>
{
    public int GuestOrderId { get; set; }
    public required GuestViewModel Guest { get; set; }
    public DateOnly CreationDate { get; set; }
    public string? Comment { get; set; }
    public CategoryViewModel? Category { get; set; }
}