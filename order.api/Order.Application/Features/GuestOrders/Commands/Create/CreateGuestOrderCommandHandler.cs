using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Features.Guests.Commands.Create;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.GuestOrders.Commands.Create;

public class CreateGuestOrderCommandHandler(OrderDbContext context, IMapper mapper, IMediator mediator)
    : IRequestHandler<CreateGuestOrderCommand, int>
{
    public async Task<int> Handle(CreateGuestOrderCommand request, CancellationToken cancellationToken)
    {
        var guest = await context.Guests
            .FirstOrDefaultAsync(g => g.Email == request.Email,
                cancellationToken: cancellationToken);

        var guestOrder = mapper.Map<GuestOrder>(request);

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

        await context.GuestOrders.AddAsync(guestOrder, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return guestOrder.GuestOrderId;
    }
}