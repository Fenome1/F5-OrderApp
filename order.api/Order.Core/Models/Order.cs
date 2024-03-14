namespace Order.Core.Models;

public class Order
{
    public int OrderId { get; set; }

    public int? UserId { get; set; }

    public int? GuestId { get; set; }

    public int? CategoryId { get; set; }

    public string? Comment { get; set; }

    public DateOnly CreationDate { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Guest? Guest { get; set; }

    public virtual User? User { get; set; }
}