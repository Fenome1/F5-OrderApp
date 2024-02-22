using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Enums;
using Order.Application.Common.Exceptions;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;
using Order.Persistence.Context;

namespace Order.Application.Features.GuestOrders.Queries.List;

public class ListGuestOrdersQueryHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<ListGuestOrdersQuery, PagedList<GuestOrderViewModel>>
{
    public async Task<PagedList<GuestOrderViewModel>> Handle(ListGuestOrdersQuery request,
        CancellationToken cancellationToken)
    {
        var query = context.GuestOrders
            .Include(go => go.Category)
            .Include(go => go.Guest)
            .AsSplitQuery();

        query = request.Filter switch
        {
            DeletionStatus.Available => query.Where(e => !e.IsDeleted),
            DeletionStatus.Deleted => query.Where(e => e.IsDeleted),
            _ => query
        };

        var paginatedOrders = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var viewModels = mapper.Map<GuestOrderViewModel[]>(paginatedOrders);

        if (viewModels is null || !viewModels.Any())
            throw new NotFoundException(nameof(viewModels));

        var totalCount = await query.CountAsync(cancellationToken);

        return new PagedList<GuestOrderViewModel>
        {
            PageSize = request.PageSize,
            CurrentPage = request.Page,
            TotalCount = totalCount,
            Items = viewModels
        };
    }
}