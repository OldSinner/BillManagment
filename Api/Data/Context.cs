
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Icon> Icon { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Bill> Bill { get; set; }
        public Context(DbContextOptions<Context> opt) : base(opt)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>().HasData(new Category
            {
                Id = Guid.NewGuid(),
                Name = "Jedzenie",
                Owner = null,
                iconClassName = null
            },
            new Category
            {
                Id = Guid.NewGuid(),
                Name = "Rozrywka",
                Owner = null,
                iconClassName = null
            },
            new Category
            {
                Id = Guid.NewGuid(),
                Name = "Opłaty",
                Owner = null,
                iconClassName = null
            },
            new Category
            {
                Id = Guid.NewGuid(),
                Name = "Za dziwki i koks",
                Owner = null,
                iconClassName = null
            },
            new Category
            {
                Id = Guid.NewGuid(),
                Name = "Paliwo",
                Owner = null,
                iconClassName = null
            });
        }
    }
}