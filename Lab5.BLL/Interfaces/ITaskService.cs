using Lab5.BLL.DTO;
using Lab5.DAL.Entities;
using Lab5.DAL.UnitOfWork;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Interfaces;

public interface ITaskService
{
    Task CreateTask(TaskDto newTask);
    Task GetTaskById(int taskId);
    void SetTaskPriority(Task task, bool priority);
    void SetTaskPriority(int taskId, bool priority);
    void UpdateTask(TaskDto newData);
    void DeleteTask(int taskId);
    void DeleteTask(Task task);
}