using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Persistence.Context;

namespace Order.Application.Features.GuestOrders.Commands.Delete;

public class DeleteGuestOrderCommandHandler(OrderDbContext context) : IRequestHandler<DeleteGuestOrderCommand, bool>
{
    public async Task<bool> Handle(DeleteGuestOrderCommand request, CancellationToken cancellationToken)
    {
        var guestOrder = await context.GuestOrders
            .FirstOrDefaultAsync(go => go.GuestOrderId == request.GuestOrderId,
                cancellationToken);

        if (guestOrder is null)
            throw new NotFoundException(nameof(guestOrder));

        context.GuestOrders.Remove(guestOrder);

        return await context.SaveChangesAsync(cancellationToken) > 1;
    }
}