using MediatR;

namespace Order.Application.Features.Orders.Commands.Delete;

public class DeleteOrderCommand : IRequest<Unit>
{
    public required int OrderId { get; set; }
}