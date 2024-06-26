﻿using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Application.ViewModels;
using Order.Persistence.Context;

namespace Order.Application.Features.Users.Commands.Update;

public class UpdateUserCommandHandler(IMapper mapper, OrderDbContext context)
    : IRequestHandler<UpdateUserCommand, UserViewModel>
{
    public async Task<UserViewModel> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.UserId == request.UserId,
                cancellationToken);

        if (user is null)
            throw new NotFoundException(nameof(user));

        if (!string.IsNullOrWhiteSpace(request.Email))
        {
            var existedUser = await context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email,
                    cancellationToken);

            if (existedUser is not null && existedUser.UserId != request.UserId)
                throw new Exception("Почта уже занята");

            user.Email = request.Email;
        }

        user.FirstName = request.FirstName;
        user.SecondName = request.SecondName;
        user.MiddleName = request.MiddleName;

        context.Users.Update(user);
        await context.SaveChangesAsync(cancellationToken);

        return mapper.Map<UserViewModel>(user);
    }
}