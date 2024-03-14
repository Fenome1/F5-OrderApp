namespace Order.Core.Models;

public class User
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int Role { get; set; }

    public string? FirstName { get; set; }

    public string? SecondName { get; set; }

    public string? MiddleName { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual RefreshToken? RefreshToken { get; set; }

    public virtual Role RoleNavigation { get; set; } = null!;
}