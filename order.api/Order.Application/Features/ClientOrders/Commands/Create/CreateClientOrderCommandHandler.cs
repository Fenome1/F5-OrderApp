using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.ClientOrders.Commands.Create;

public class CreateClientOrderCommandHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<CreateClientOrderCommand, int>
{
    public async Task<int> Handle(CreateClientOrderCommand request, CancellationToken cancellationToken)
    {
        var isUserExist = await context.Users.AnyAsync(u => u.UserId == request.UserId, cancellationToken);

        if (!isUserExist)
            throw new NotFoundException(nameof(User));

        var clientOrder = mapper.Map<ClientOrder>(request);

        await context.ClientOrders.AddAsync(clientOrder, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return clientOrder.ClientOrderId;
    }
}