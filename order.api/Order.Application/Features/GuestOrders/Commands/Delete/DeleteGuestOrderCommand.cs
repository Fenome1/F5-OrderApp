using MediatR;

namespace Order.Application.Features.GuestOrders.Commands.Delete;

public class DeleteGuestOrderCommand : IRequest<bool>
{
    public int GuestOrderId { get; set; }
}