using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Features.Guests.Commands.Create;
using Order.Persistence.Context;

namespace Order.Application.Features.Orders.Commands.Create.ByGuest;

public class CreateOrderByGuestCommandHandler(OrderDbContext context, IMapper mapper, IMediator mediator)
    : IRequestHandler<CreateOrderByGuestCommand, int>
{
    public async Task<int> Handle(CreateOrderByGuestCommand request, CancellationToken cancellationToken)
    {
        var guest = await context.Guests
            .FirstOrDefaultAsync(g => g.Email == request.Email,
                cancellationToken);

        var guestOrder = mapper.Map<Core.Models.Order>(request);


        if (guest is null)
        {
            var guestId = await mediator.Send(
                new CreateGuestCommand
                {
                    Email = request.Email
                },
                cancellationToken);

            guestOrder.GuestId = guestId;
        }
        else
        {
            guestOrder.GuestId = guest.GuestId;
        }

        await context.Orders.AddAsync(guestOrder, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return guestOrder.OrderId;
    }
}