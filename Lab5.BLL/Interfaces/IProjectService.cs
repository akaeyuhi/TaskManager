using Lab5.BLL.DTO;
using Lab5.DAL.Entities;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Interfaces;

public interface IProjectService
{
    Project CreateProject(ProjectDto projectDto);
    Project GetProjectById(int projectId);
    IEnumerable<Project> GetAllProjects();
    void AddUsers(int projectId, IEnumerable<User> users);
    void AddTasks(int projectId, IEnumerable<Task> tasks);
    void AddUsers(int projectId, User user);
    void AddTasks(int projectId, Task task);
    void DeleteProject(int projectId);
    void ClearTasks(int projectId);
    void ClearUsers(int projectId);
}