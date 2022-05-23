
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class Context : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Role { get; set; }
        public Context(DbContextOptions<Context> opt) : base(opt)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}