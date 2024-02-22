namespace Order.Application.Features.Base.Query;

public abstract record PaginatedQuery
{
    public required int Page { get; set; } = 1;
    public required int PageSize { get; set; } = 10;
}