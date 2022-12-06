using System.Data.Entity;
using Lab5.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.EF;

public class ManagerContext : DbContext
{
    public ManagerContext(DbContextOptions options): base(options)
    {
        Database.EnsureCreated();
    }

    public Microsoft.EntityFrameworkCore.DbSet<Task> Tasks { get; set; }
    public Microsoft.EntityFrameworkCore.DbSet<User> Users { get; set; }
    public Microsoft.EntityFrameworkCore.DbSet<Project> Projects { get; set; }
}