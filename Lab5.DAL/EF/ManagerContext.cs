using Lab5.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.EF;

public class ManagerContext : DbContext
{
    public ManagerContext(DbContextOptions options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Task> Tasks { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
}