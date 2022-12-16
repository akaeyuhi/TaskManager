using Lab5.BLL.DTO;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Interfaces;

public interface ITaskService
{
    Task CreateTask(TaskDto taskDto);
    Task? GetTaskById(int taskId);

    IEnumerable<Task> GetAllTasks();
    void SetTaskPriority(Task task, bool priority);
    void SetTaskPriority(int taskId, bool priority);
    void SetTaskStatus(int taskId, string status);
    void SetTaskStatus(Task task, string status);
    void UpdateTask(Task task, TaskDto taskDto);
    void UpdateTask(int taskId, TaskDto taskDto);
    void DeleteTask(int taskId);
    void DeleteTask(Task task);
}