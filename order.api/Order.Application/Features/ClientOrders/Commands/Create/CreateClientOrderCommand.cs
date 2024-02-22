using MediatR;
using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.Features.ClientOrders.Commands.Create;

public class CreateClientOrderCommand : IRequest<int>, IMapWith<ClientOrder>
{
    public required int UserId { get; set; }
    public int? CategoryId { get; set; }
    public string? Comment { get; set; }
}