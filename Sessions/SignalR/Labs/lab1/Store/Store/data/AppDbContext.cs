using Microsoft.EntityFrameworkCore;
using Store.Models;

namespace Store.data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Comments> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Add any additional configuration here
            // For example, you can configure the primary key, relationships, etc.
            modelBuilder.Entity<Comments>()
                .HasOne(c => c.Product).WithMany(p => p.Comments).HasForeignKey(c => c.ProductId);
            modelBuilder.Entity<Product>().HasData(
                    new Product { Id = 1, Name = "Laptop", Price = 999,Quantity=15 },
                    new Product { Id = 2, Name = "Smartphone", Price = 699,Quantity = 30 }
                );

            modelBuilder.Entity<Comments>().HasData(
                new Comments { Id = 1, Author = "Alice", Text = "Great product!", ProductId = 1 },
                new Comments { Id = 2, Author = "Bob", Text = "Fast delivery.",ProductId = 2 }
            );
        }
    }
}
