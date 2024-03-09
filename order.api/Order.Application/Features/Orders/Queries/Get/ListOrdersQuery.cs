using MediatR;
using Order.Application.Common.Enums;
using Order.Application.Features.Base.Query;
using Order.Application.ViewModels;
using Order.Application.ViewModels.Base;

namespace Order.Application.Features.Orders.Queries.Get;

public record ListOrdersQuery : PaginatedQuery, IRequest<PagedList<OrderViewModel>>
{
    public string? Search { get; set; }
    public int? CategoryId { get; set; }
    public required DeletionStatus Filter { get; init; } = DeletionStatus.Available;
    public required MemberType MemberType { get; init; } = MemberType.Client;
}