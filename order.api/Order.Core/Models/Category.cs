namespace Order.Core.Models;

public class Category
{
    public int CategoryId { get; set; }

    public string Title { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}