using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Order.Application.Common.Exceptions;
using Order.Application.ViewModels;
using Order.Persistence.Context;

namespace Order.Application.Features.Categories.Queries.List;

public class ListCategoriesQueryHandler(OrderDbContext context, IMapper mapper)
    : IRequestHandler<ListCategoriesQuery, List<CategoryViewModel>>
{
    public async Task<List<CategoryViewModel>> Handle(ListCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await context.Categories
            .AsNoTrackingWithIdentityResolution()
            .ToListAsync(cancellationToken);

        if (categories is null || !categories.Any())
            throw new NotFoundException(nameof(categories));

        return mapper.Map<CategoryViewModel[]>(categories).ToList();
    }
}