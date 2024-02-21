using MediatR;
using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.Features.GuestOrders.Commands.Create;

public class CreateGuestOrderCommand : IRequest<int>, IMapWith<GuestOrder>
{
    public required string Email { get; set; }
    public int? CategoryId { get; set; }
    public string? Comment { get; set; }
}