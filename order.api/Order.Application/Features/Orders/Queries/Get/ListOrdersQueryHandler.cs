using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Enums;
using Order.Application.Common.Exceptions;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;
using Order.Persistence.Context;

namespace Order.Application.Features.Orders.Queries.Get;

public class ListOrdersQueryHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<ListOrdersQuery, PagedList<OrderViewModel>>
{
    public async Task<PagedList<OrderViewModel>> Handle(ListOrdersQuery request, CancellationToken cancellationToken)
    {
        var query = context.Orders
            .Include(o => o.Category)
            .Include(o => o.Guest)
            .Include(o => o.User)
            .AsSplitQuery();

        query = request.Filter switch
        {
            DeletionStatus.Available => query.Where(o => !o.IsDeleted),
            DeletionStatus.Deleted => query.Where(o => o.IsDeleted),
            _ => query
        };

        query = request.MemberType switch
        {
            MemberType.Client => query.Where(o => o.GuestId == null),
            MemberType.Guest => query.Where(o => o.UserId == null),
            _ => query
        };

        var paginatedOrders = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var viewModels = mapper.Map<OrderViewModel[]>(paginatedOrders);

        if (viewModels is null || !viewModels.Any())
            throw new NotFoundException(nameof(viewModels));

        var totalCount = await query.CountAsync(cancellationToken);

        return new PagedList<OrderViewModel>
        {
            PageSize = request.PageSize,
            CurrentPage = request.Page,
            TotalCount = totalCount,
            Items = viewModels
        };
    }
}