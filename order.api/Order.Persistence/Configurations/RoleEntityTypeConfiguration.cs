using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Core.Models;

namespace Order.Persistence.Configurations;

public class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.Property(e => e.RoleId).ValueGeneratedNever();
        builder.Property(e => e.Title).HasMaxLength(50);
        builder.HasData([
            new Role
            {
                RoleId = 1,
                Title = "Client"
            },
            new Role
            {
                RoleId = 2,
                Title = "Admin"
            }
        ]);
    }
}