using MediatR;
using Order.Application.Common.Enums;
using Order.Application.Features.Base.Query;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;

namespace Order.Application.Features.ClientOrders.Queries.List;

public record ListClientOrdersQuery : PaginatedQuery, IRequest<PagedList<ClientOrderViewModel>>
{
    public required DeletionStatus Filter { get; init; } = DeletionStatus.Available;
}