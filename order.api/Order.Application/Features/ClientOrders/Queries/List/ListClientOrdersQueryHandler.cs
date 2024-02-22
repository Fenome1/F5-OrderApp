using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Enums;
using Order.Application.Common.Exceptions;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;
using Order.Persistence.Context;

namespace Order.Application.Features.ClientOrders.Queries.List;

public class ListClientOrdersQueryHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<ListClientOrdersQuery, PagedList<ClientOrderViewModel>>
{
    public async Task<PagedList<ClientOrderViewModel>> Handle(ListClientOrdersQuery request,
        CancellationToken cancellationToken)
    {
        var query = context.ClientOrders
            .Include(co => co.Category)
            .Include(co => co.User)
            .ThenInclude(u => u.RoleNavigation)
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

        var viewModels = mapper.Map<ClientOrderViewModel[]>(paginatedOrders);

        if (viewModels is null || !viewModels.Any())
            throw new NotFoundException(nameof(viewModels));

        var totalCount = await query.CountAsync(cancellationToken);

        return new PagedList<ClientOrderViewModel>
        {
            PageSize = request.PageSize,
            CurrentPage = request.Page,
            TotalCount = totalCount,
            Items = viewModels
        };
    }
}