using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.Orders.Commands.Create.ByUser;

public class CreateOrderByUserCommandHandler(OrderDbContext context, IMapper mapper) : IRequestHandler<CreateOrderByUserCommand, int>
{
    public async Task<int> Handle(CreateOrderByUserCommand request, CancellationToken cancellationToken)
    {
        var isUserExist = await context.Users.AnyAsync(u => u.UserId == request.UserId, cancellationToken);

        if (!isUserExist)
            throw new NotFoundException(nameof(User));

        var clientOrder = mapper.Map<Core.Models.Order>(request);

        await context.Orders.AddAsync(clientOrder, cancellationToken);

        await context.SaveChangesAsync(cancellationToken);

        return clientOrder.OrderId;
    }
}