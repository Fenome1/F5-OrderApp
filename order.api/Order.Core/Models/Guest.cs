namespace Order.Core.Models;

public class Guest
{
    public int GuestId { get; set; }

    public string Email { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}