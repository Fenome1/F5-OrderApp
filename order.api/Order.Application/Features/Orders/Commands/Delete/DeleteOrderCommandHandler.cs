using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Persistence.Context;

namespace Order.Application.Features.Orders.Commands.Delete;

public class DeleteOrderCommandHandler(OrderDbContext context) : IRequestHandler<DeleteOrderCommand, Unit>
{
    public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await context.Orders
            .FirstOrDefaultAsync(o => o.OrderId == request.OrderId,
                cancellationToken);

        if (order is null)
            throw new NotFoundException(nameof(order));

        order.IsDeleted = true;

        await context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}