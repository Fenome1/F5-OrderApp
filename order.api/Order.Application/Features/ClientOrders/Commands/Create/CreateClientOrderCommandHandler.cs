using AutoMapper;
using MediatR;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.ClientOrders.Commands.Create;

public class CreateClientOrderCommandHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<CreateClientOrderCommand, int>
{
    public async Task<int> Handle(CreateClientOrderCommand request, CancellationToken cancellationToken)
    {
        var clientOrder = mapper.Map<ClientOrder>(request);

        await context.ClientOrders.AddAsync(clientOrder);

        return clientOrder.ClientOrderId;
    }
}