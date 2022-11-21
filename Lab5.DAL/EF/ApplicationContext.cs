using Lab5.DAL.Entities;
using Database = System.Data.Entity.Database;
using DbContext = System.Data.Entity.DbContext;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.EF;

public class ApplicationContext : DbContext
{
    public System.Data.Entity.DbSet<Task> Tasks { get; set; }
    public System.Data.Entity.DbSet<User> Users { get; set; }
    public System.Data.Entity.DbSet<Project> Projects { get; set; }

    static ApplicationContext()
    {
        Database.SetInitializer(new ApplicationContextInitializer());
    }
 
    public ApplicationContext(string connectionString): base(connectionString) {}
}