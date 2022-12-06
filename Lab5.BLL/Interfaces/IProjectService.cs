using Lab5.BL.DTO;
using Lab5.DAL.Entities;
using Lab5.DAL.UnitOfWork;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BL.Interfaces;

public interface IProjectService
{
    UnitOfWork Data { get; }
    void CreateProject(CurrentProject newProject);
    void AddUsers(int projectId, IEnumerable<User> users);
    void AddTasks(int projectId, IEnumerable<Task> tasks);
    void AddUsers(int projectId, User user);
    void AddTasks(int projectId, Task task);
    void DeleteProject(int projectId);
    void ClearTasks(int projectId);
    void ClearProjects(int projectId);
}