using Lab5.BLL.DTO;
using Lab5.BLL.Infrastructure.Exceptions;
using Lab5.BLL.Interfaces;
using Lab5.DAL.Interfaces;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Services;

public class TaskService : ITaskService
{
    private readonly IUnitOfWork _data;
    private readonly IEnumerable<string> _status = new [] {"progress", "completed", "abandoned"};

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
            Priority = taskDto.Priority,
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

    public Task? GetTaskById(int taskId)
    {
        return _data.Tasks.GetById(taskId);
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
        if (task == null) throw new TaskServiceException("Invalid task id");
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

    public void SetTaskStatus(int taskId, string status)
    {
        if(!_status.Contains(status)) throw new TaskServiceException("Invalid status");
        var task = GetTaskById(taskId);
        if (task == null) throw new TaskServiceException("Invalid task id");
        try
        {
            task.Status = status;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void SetTaskStatus(Task task, string status)
    {
        if(!_status.Contains(status)) throw new TaskServiceException("Invalid status");
        try
        {
            task.Status = status;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void UpdateTask(Task task, TaskDto taskDto)
    {
        try
        {
            task.Name = taskDto.Name != "" ? taskDto.Name : task.Name;
            task.Description = taskDto.Description != "" ? taskDto.Description : task.Description;
            task.Priority = taskDto.Priority != task.Priority ? taskDto.Priority : task.Priority;
            task.Status = taskDto.Status != task.Status ? taskDto.Status : task.Status;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void UpdateTask(int taskId, TaskDto taskDto)
    {
        var task = GetTaskById(taskId);
        if (task == null) throw new TaskServiceException("Invalid task id");

        try
        {
            task.Name = taskDto.Name != "" ? taskDto.Name : task.Name;
            task.Description = taskDto.Description != "" ? taskDto.Description : task.Description;
            task.Priority = taskDto.Priority != task.Priority ? taskDto.Priority : task.Priority;
            task.Status = taskDto.Status != task.Status ? taskDto.Status : task.Status;
            _data.Tasks.Update(task);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }
}