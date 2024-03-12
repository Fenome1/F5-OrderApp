using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Core.Models;

namespace Order.Persistence.Configurations;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasIndex(e => e.Email, "UQ_User").IsUnique();

        builder.Property(e => e.Email).HasMaxLength(256);
        builder.Property(e => e.FirstName).HasMaxLength(50);
        builder.Property(e => e.MiddleName).HasMaxLength(50);
        builder.Property(e => e.Password).HasMaxLength(128);
        builder.Property(e => e.Role).HasDefaultValue(1);
        builder.Property(e => e.SecondName).HasMaxLength(50);

        builder.HasOne(d => d.RoleNavigation).WithMany(p => p.Users)
            .HasForeignKey(d => d.Role)
            .HasConstraintName("FK_User_Role");

        builder.HasData([
            new() {
                UserId = 1,
                Email = "admin@f5.ru",
                FirstName = "Админ",
                Role = 2,
                Password = "$2a$11$f0rNxIcLbt/2QKL3GkbQwuh.Lt3sTieQIWsF23OnlIONIuY7QxZOC"
            }
        ]);
    }
}