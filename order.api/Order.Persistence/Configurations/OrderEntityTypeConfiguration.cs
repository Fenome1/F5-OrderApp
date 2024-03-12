using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Order.Persistence.Configurations;

public class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Core.Models.Order>
{
    public void Configure(EntityTypeBuilder<Core.Models.Order> builder)
    {
        builder.HasKey(e => e.OrderId).HasName("PK_ClientOrder");

        builder.Property(e => e.CreationDate).HasDefaultValueSql("(getdate())");

        builder.HasOne(d => d.Category).WithMany(p => p.Orders)
            .HasForeignKey(d => d.CategoryId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ClientOrder_Category");

        builder.HasOne(d => d.Guest).WithMany(p => p.Orders)
            .HasForeignKey(d => d.GuestId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_Order_Guest");

        builder.HasOne(d => d.User).WithMany(p => p.Orders)
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Cascade)
            .HasConstraintName("FK_ClientOrder_User");
    }
}