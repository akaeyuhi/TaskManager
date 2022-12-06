using Lab5.BL.DTO;
using Lab5.DAL.Entities;
using Lab5.DAL.UnitOfWork;
using Task = System.Threading.Tasks.Task;

namespace Lab5.BL.Interfaces;

public interface IUserService
{
    UnitOfWork Data { get; }
    User CreateUser(UserDto newUser);
    User GetUserById(int userId);
    void DeleteUser(int userId);
    void DeleteUser(User user);
    void UpdateUser(UserDto newData);
    void SetBusyness(int userId, bool isBusy);
    void SetBusyness(User user, bool isBusy);
    void AssignTask(User user, Task task);
    void AssignTask(int userId, int taskId);
    void ClearTask(User user);
    void ClearTask(int userId);
}