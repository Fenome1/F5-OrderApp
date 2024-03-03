using MediatR;
using Order.Application.Common.Mappings;

namespace Order.Application.Features.Orders.Commands.Create.ByGuest;

public class CreateOrderByGuestCommand : IRequest<int>, IMapWith<Core.Models.Order>
{
    public required string Email { get; set; }
    public int? CategoryId { get; set; }
    public string? Comment { get; set; }
}