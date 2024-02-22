using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Application.ViewModels;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Queries;

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserViewModel>
{
    private readonly OrderDbContext _context;
    private readonly IMapper _mapper;

    public GetUserQueryHandler(OrderDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<UserViewModel> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .Include(u => u.RoleNavigation)
            .FirstOrDefaultAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(user));

        return _mapper.Map<UserViewModel>(user);
    }
}