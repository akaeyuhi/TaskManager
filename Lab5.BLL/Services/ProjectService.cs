using Lab5.BLL.DTO;
using Lab5.BLL.Infrastructure.Exceptions;
using Lab5.BLL.Interfaces;
using Lab5.DAL.Entities;
using Lab5.DAL.Interfaces;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Services;

public class ProjectService: IProjectService
{
    private readonly IUnitOfWork _data;

    public ProjectService(IUnitOfWork context)
    {
        _data = context;
    }
    
    public Project CreateProject(ProjectDto projectDto)
    {
        var project = new Project
        {
            ProjectName = projectDto.ProjectName,
        };
        try
        {
            _data.Projects.Add(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }

        return project;
    }

    public Project? GetProjectById(int projectId)
    {
        return _data.Projects.GetById(projectId);
    }

    public IEnumerable<Project> GetAllProjects()
    {
        return _data.Projects.GetAll();
    }

    public void AddUsers(int projectId, IEnumerable<User> users)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            foreach (var user in users)
            {
                project.Users.Add(user);
            }

            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }
        
    }

    public void AddTasks(int projectId, IEnumerable<Task> tasks)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            foreach (var task in tasks)
            {
                project.Tasks.Add(task);
            }

            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }
    }

    public void AddUsers(int projectId, User user)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.Users.Add(user);
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }
    }

    public void AddTasks(int projectId, Task task)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.Tasks.Add(task);
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }
    }

    public void DeleteProject(int projectId)
    {
        try
        {
            _data.Projects.Delete(projectId);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void ClearTasks(int projectId)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.Tasks.Clear();
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }
    }

    public void ClearUsers(int projectId)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.Users.Clear();
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new ProjectServiceException(ex.Message);
        }
    }

    public void DeleteUser(int projectId, User user)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.Users.Remove(user);
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void DeleteTask(int projectId, Task task)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.Tasks.Remove(task);
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }

    public void UpdateProject(int projectId, ProjectDto projectDto)
    {
        var project = GetProjectById(projectId);
        if (project == null) throw new ProjectServiceException("Invalid project id");
        try
        {
            project.ProjectName = projectDto.ProjectName != "" ? projectDto.ProjectName : project.ProjectName;
            _data.Projects.Update(project);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new TaskServiceException(ex.Message);
        }
    }
}