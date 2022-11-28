using Lab5.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.EF;

public class ApplicationContext : DbContext
{
    public ApplicationContext()
    {
        Database.EnsureCreated();
    }

    public DbSet<Task> Tasks { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=localhost;Port=5433;Database=labdatabase;Username=postgres;admin");
    }
}