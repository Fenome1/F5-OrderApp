using MediatR;
using Order.Application.ViewModels;

namespace Order.Application.Features.Categories.Queries.List;

public class ListCategoriesQuery : IRequest<List<CategoryViewModel>>
{
}