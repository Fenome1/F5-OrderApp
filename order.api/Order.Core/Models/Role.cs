namespace Order.Core.Models;

public class Role
{
    public int RoleId { get; set; }

    public string Title { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}