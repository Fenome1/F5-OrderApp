using AutoMapper;
using MediatR;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.Guests.Commands.Create;

public class CreateQuestCommandHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<CreateGuestCommand, int>
{
    public async Task<int> Handle(CreateGuestCommand request, CancellationToken cancellationToken)
    {
        var isEmailExist = context.Guests
            .Any(g => g.Email == request.Email);

        if (isEmailExist)
            throw new Exception("Гость уже зарегистрирован");

        var newGuest = mapper.Map<Guest>(request);

        await context.Guests.AddAsync(newGuest, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);
        
        return newGuest.GuestId;
    }
}