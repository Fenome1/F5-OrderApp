using AutoMapper;
using MediatR;
using Order.Application.Common.Interfaces;
using Order.Core.Models;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Create;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    private readonly OrderDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _passwordHasher;

    public CreateUserCommandHandler(IPasswordHasher passwordHasher, IMapper mapper, OrderDbContext context)
    {
        _passwordHasher = passwordHasher;
        _mapper = mapper;
        _context = context;
    }

    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var isLoginExist = _context.Users
            .Any(u => u.Login == request.Login);

        if (isLoginExist)
            throw new Exception("Пользователь с таким логином уже существует");

        var user = _mapper.Map<User>(request);
        user.Password = _passwordHasher.Hash(request.Password);

        await _context.Users.AddAsync(user, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return user.UserId;
    }
}