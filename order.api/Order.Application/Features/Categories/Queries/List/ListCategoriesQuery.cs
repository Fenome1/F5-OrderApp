using MediatR;
using Order.Application.ViewModels;
using Order.Core.Models;

namespace Order.Application.Features.Categories.Queries.List;

public class ListCategoriesQuery : IRequest<List<CategoryViewModel>>
{
    
}