using Lab5.BL.DTO;
using Lab5.DAL.Entities;
using Lab5.DAL.UnitOfWork;
using Task = System.Threading.Tasks.Task;

namespace Lab5.BL.Interfaces;

public interface ITaskService
{
    UnitOfWork Data { get; }
    Task CreateTask(CurrentTask newTask);
    Task GetTaskById(int taskId);
    void SetTaskPriority(Task task, bool priority);
    void SetTaskPriority(int taskId, bool priority);
    void UpdateTask(CurrentTask newData);
    void DeleteTask(int taskId);
    void DeleteTask(Task task);
}