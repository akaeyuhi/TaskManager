using Lab5.DAL.Entities;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.Interfaces;

public interface IUnitOfWork: IDisposable
{
    IRepository<Project> Projects { get; }
    IRepository<User> Users { get; }
    IRepository<Task> Tasks { get; }
    void Save();
}