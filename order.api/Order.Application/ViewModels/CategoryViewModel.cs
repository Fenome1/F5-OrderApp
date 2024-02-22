using Order.Application.Common.Mappings;
using Order.Core.Models;

namespace Order.Application.ViewModels;

public class CategoryViewModel : IMapWith<Category>
{
    public int CategoryId { get; set; }

    public required string Title { get; set; }
}