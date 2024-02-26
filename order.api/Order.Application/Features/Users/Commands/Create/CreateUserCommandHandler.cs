using AutoMapper;
using MediatR;
using Order.Application.Common.Interfaces;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Create;

public class CreateUserCommandHandler(IPasswordHasher passwordHasher, IMapper mapper, OrderDbContext context)
    : IRequestHandler<CreateUserCommand, int>
{
    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var isLoginExist = context.Users
            .Any(u => u.Email == request.Email);

        if (isLoginExist)
            throw new Exception("Пользователь с таким логином уже существует");

        var user = mapper.Map<User>(request);
        user.Password = passwordHasher.Hash(request.Password);

        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return user.UserId;
    }
}