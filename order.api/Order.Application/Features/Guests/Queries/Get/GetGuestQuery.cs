using MediatR;
using Order.Core.Models;

namespace Order.Application.Features.Guests.Queries.Get;

public class GetGuestQuery : IRequest<Guest>
{
    public int GuestId { get; set; }
}