using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.Guests.Queries.Get;

public class GetGuestQueryHandler(OrderDbContext context) : IRequestHandler<GetGuestQuery, Guest>
{
    public async Task<Guest> Handle(GetGuestQuery request, CancellationToken cancellationToken)
    {
        var guest = await context.Guests
            .FirstOrDefaultAsync(g => g.GuestId == request.GuestId,
                cancellationToken);

        if (guest is null)
            throw new NotFoundException(nameof(guest));

        return guest;
    }
}