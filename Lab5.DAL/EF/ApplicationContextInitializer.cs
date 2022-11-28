using System.Data.Entity;
using Lab5.DAL.Entities;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.EF;

public class ApplicationContextInitializer
{
    protected void Seed(ApplicationContext db)
    {
        var user1 = new User
        {
            Name = "Steve"
        };
        var user2 = new User
        {
            Name = "Bob"
        };
        var user3 = new User
        {
            Name = "Taylor"
        };
        db.Users.AddRange(new List<User> { user1, user2, user3 });

        var tasks = new List<Task>
        {
            new()
            {
                Id = 1,
                Name = "Task1",
                Description = "blah blah blah",
                Priority = true,
                User = user2
            },
            new()
            {
                Id = 2,
                Name = "Task2",
                Description = "blah blah blah",
                Priority = false,
                User = user1
            },
            new()
            {
                Id = 3,
                Name = "Task3",
                Description = "blah blah blah",
                Priority = true,
                User = user3
            }
        };
        db.Tasks.AddRange(tasks);

        var project = new Project
        {
            ProjectName = "Test task"
        };
        foreach (var task in db.Tasks) project.Tasks?.Add(task);

        foreach (var user in db.Users) project.Users?.Add(user);
    }
}