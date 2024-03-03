using MediatR;
using Order.Application.Common.Mappings;

namespace Order.Application.Features.Orders.Commands.Create.ByUser;

public class CreateOrderByUserCommand : IRequest<int>, IMapWith<Core.Models.Order>
{
    public required int UserId { get; set; }
    public int? CategoryId { get; set; }
    public string? Comment { get; set; }
}