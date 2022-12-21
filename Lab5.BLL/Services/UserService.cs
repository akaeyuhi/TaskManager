using Lab5.BLL.DTO;
using Lab5.BLL.Infrastructure.Exceptions;
using Lab5.BLL.Interfaces;
using Lab5.DAL.Entities;
using Lab5.DAL.Interfaces;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Services;

public class UserService : IUserService
{
    private readonly IUnitOfWork _data;

    public UserService(IUnitOfWork context)
    {
        _data = context;
    }

    public User CreateUser(UserDto userDto)
    {
        var user = new User
        {
            Name = userDto.Name,
            Busyness = userDto.Busyness,
        };
        try
        {
            _data.Users.Add(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }

        return user;
    }

    public User? GetUserById(int userId)
    {
        return _data.Users.GetById(userId);
    }

    public IEnumerable<User> GetAllUsers()
    {
        return _data.Users.GetAll();
    }

    public void ClearTask(int userId)
    {
        var user = GetUserById(userId);
        if (user == null) throw new UserServiceException("Invalid user id");

        try
        {
            user.Task = null;
            user.Busyness = false;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void ClearTask(User user)
    {
        try
        {
            user.Task = null;
            user.Busyness = false;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void DeleteUser(User user)
    {
        try
        {
            _data.Users.Delete(user.Id);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void DeleteUser(int userId)
    {
        try
        {
            _data.Users.Delete(userId);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void SetBusyness(int userId, bool busyness)
    {
        var user = GetUserById(userId);
        if (user == null) throw new UserServiceException("Invalid user id");
        try
        {
            user.Busyness = busyness;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }


    public void SetBusyness(User user, bool busyness)
    {
        try
        {
            user.Busyness = busyness;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void UpdateUser(User user, UserDto userDto)
    {
        try
        {
            user.Name = userDto.Name != user.Name ? userDto.Name : user.Name;
            user.Busyness = userDto.Busyness != user.Busyness ? userDto.Busyness : user.Busyness;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void UpdateUser(int userId, UserDto userDto)
    {
        var user = GetUserById(userId);
        if (user == null) throw new UserServiceException("Invalid user id");
        try
        {
            user.Name = userDto.Name != user.Name ? userDto.Name : user.Name;
            user.Busyness = userDto.Busyness != user.Busyness ? userDto.Busyness : user.Busyness;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void AssignTask(User user, Task task)
    {
        if (user.ProjectId != task.ProjectId) throw new UserServiceException("User and Task belong to separate teams");
        try
        {
            user.Task = task;
            user.Busyness = true;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }

    public void AssignTask(int userId, Task task)
    {
        var user = GetUserById(userId);
        if (user == null) throw new UserServiceException("Invalid user id");
        if (user.ProjectId != task.ProjectId) throw new UserServiceException("User and Task belong to separate teams");
        try
        {
            user.Task = task;
            user.Busyness = true;
            _data.Users.Update(user);
            _data.Save();
        }
        catch (Exception ex)
        {
            throw new UserServiceException(ex.Message);
        }
    }
}