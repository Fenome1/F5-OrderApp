using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Core.Models;

namespace Order.Persistence.Configurations;

public class GuestEntityTypeConfiguration : IEntityTypeConfiguration<Guest>
{
    public void Configure(EntityTypeBuilder<Guest> builder)
    {
        builder.HasIndex(e => e.Email, "UQ_Guest").IsUnique();
        builder.Property(e => e.Email).HasMaxLength(256);
    }
}