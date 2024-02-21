using System;
using System.Collections.Generic;

namespace Order.Core.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int Role { get; set; }

    public string? FirstName { get; set; }

    public string? SecondName { get; set; }

    public string? MiddleName { get; set; }

    public bool IsDelete { get; set; }

    public virtual ICollection<ClientOrder> ClientOrders { get; set; } = new List<ClientOrder>();

    public virtual RefreshToken? RefreshToken { get; set; }

    public virtual Role RoleNavigation { get; set; } = null!;
}
