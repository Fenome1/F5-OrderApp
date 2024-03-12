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
            new Category
            {
                CategoryId = 1,
                Title = "Создание Сайтов"
            },
            new Category
            {
                CategoryId = 2,
                Title = "Аудит"
            },
            new Category
            {
                CategoryId = 3,
                Title = "Битрикс 24"
            },
            new Category
            {
                CategoryId = 4,
                Title = "Frontend аутсорс"
            },
            new Category
            {
                CategoryId = 5,
                Title = "Техническая поддержка"
            }
        ]);
    }
}