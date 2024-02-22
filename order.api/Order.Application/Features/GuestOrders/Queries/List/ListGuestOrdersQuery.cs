using MediatR;
using Order.Application.Common.Enums;
using Order.Application.Features.Base.Query;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;

namespace Order.Application.Features.GuestOrders.Queries.List;

public record ListGuestOrdersQuery : PaginatedQuery, IRequest<PagedList<GuestOrderViewModel>>
{
    public required DeletionStatus Filter { get; init; } = DeletionStatus.Available;
}