using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class ClientOrderViewModel : IMapWith<ClientOrder>
{
    public required int ClientOrderId { get; set; }
    public required UserViewModel User { get; set; }
    public DateOnly CreationDate { get; set; }
    public string? Comment { get; set; }
    public CategoryViewModel? Category { get; set; }
}