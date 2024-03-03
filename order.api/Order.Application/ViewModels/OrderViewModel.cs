using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class OrderViewModel : IMapWith<Core.Models.Order>
{
    public int OrderId { get; set; }
    public virtual UserViewModel? User { get; set; }
    public virtual GuestViewModel? Guest { get; set; }
    public virtual CategoryViewModel? Category { get; set; }
    public string? Comment { get; set; }
    public DateOnly CreationDate { get; set; }
}