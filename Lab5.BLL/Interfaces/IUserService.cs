using Lab5.BLL.DTO;
using Lab5.DAL.Entities;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.BLL.Interfaces;

public interface IUserService
{
    User CreateUser(UserDto newUser);
    User GetUserById(int userId);
    IEnumerable<User> GetAllUsers();
    void DeleteUser(int userId);
    void DeleteUser(User user);
    void UpdateUser(User user, UserDto newData);
    void UpdateUser(int userId, UserDto newData);
    void SetBusyness(int userId, bool isBusy);
    void SetBusyness(User user, bool isBusy);
    void AssignTask(User user, Task task);
    void AssignTask(int userId, Task task);
    void ClearTask(User user);
    void ClearTask(int userId);
}