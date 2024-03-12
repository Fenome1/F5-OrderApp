using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Core.Models;

namespace Order.Persistence.Configurations;

public class CategoryEntityTypeConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.Property(e => e.Title).HasMaxLength(125);

        builder.HasData([
            new()
            {
                CategoryId = 1,
                Title = "Создание Сайтов"
            },
            new()
            {
                CategoryId = 2,
                Title = "Аудит"
            },
            new()
            {
                CategoryId = 3,
                Title = "Битрикс 24"
            },
            new()
            {
                CategoryId = 4,
                Title = "Frontend аутсорс"
            },
            new()
            {
                CategoryId = 5,
                Title = "Техническая поддержка"
            }
        ]);
    }
}