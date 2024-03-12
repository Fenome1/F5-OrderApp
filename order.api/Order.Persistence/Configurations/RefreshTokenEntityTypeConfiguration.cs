using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Core.Models;

namespace Order.Persistence.Configurations;

public class RefreshTokenEntityTypeConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.HasIndex(e => e.UserId, "UQ_UserId").IsUnique();

        builder.Property(e => e.Token).HasMaxLength(450);

        builder.HasOne(d => d.User).WithOne(p => p.RefreshToken)
            .HasForeignKey<RefreshToken>(d => d.UserId)
            .HasConstraintName("FK_RefreshToken_User");
    }
}