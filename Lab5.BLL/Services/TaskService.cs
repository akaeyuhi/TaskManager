using Lab5.BLL.DTO;
using Lab5.BLL.Infrastructure.Exceptions;
using Lab5.BLL.Interfaces;
using Lab5.DAL.Interfaces;
using Lab5.DAL.UnitOfWork;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Services;

public class TaskService : ITaskService
{
    private readonly IUnitOfWork _data;

    public TaskService(IUnitOfWork data)
    {
        _data = data;
    }

    public Task CreateTask(TaskDto taskDto)
    {
        var taskToInsert = new Task
        {
            Name = taskDto.Name,
            Description = taskDto.Description,
            Status = taskDto.Status,
            Priority = taskDto.Priority
        };

        try
        {
            _data.Tasks.Add(taskToInsert);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }

        return taskToInsert;
    }

    public void DeleteTask(int taskId)
    {
        try
        {
            _data.Tasks.Delete(taskId);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void DeleteTask(Task task)
    {
        try
        {
            _data.Tasks.Delete(task.Id);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public Task GetTaskById(int taskId)
    {
        var task = _data.Tasks.GetById(taskId);
        if (task == null) throw new TaskServiceException("Task not found in DB");
        return task;
    }

    public IEnumerable<Task> GetAllTasks()
    {
        return _data.Tasks.GetAll();
    }

    public void SetTaskPriority(Task task, bool priority)
    {
        try
        {
            task.Priority = priority;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void SetTaskPriority(int taskId, bool priority)
    {
        var task = GetTaskById(taskId);
        try
        {
            task.Priority = priority;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void UpdateTask(Task task, TaskDto newData)
    {
        try
        {
            task.Name = newData.Name != "" ? newData.Name : task.Name;
            task.Description = newData.Description != "" ? newData.Description : task.Description;
            task.Priority = !newData.Priority ? newData.Priority : task.Priority;
            task.Status = newData.Status != task.Status ? newData.Status : task.Status;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }
    
    public void UpdateTask(int taskId, TaskDto newData)
    {
        var task = GetTaskById(taskId);
        try
        {
            task.Name = newData.Name != "" ? newData.Name : task.Name;
            task.Description = newData.Description != "" ? newData.Description : task.Description;
            task.Priority = !newData.Priority ? newData.Priority : task.Priority;
            task.Status = newData.Status != task.Status ? newData.Status : task.Status;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }
}