using Lab5.BLL.DTO;
using Lab5.DAL.Entities;
using Task = System.Threading.Tasks.Task;

namespace Lab5.BLL.Interfaces;

public interface IUserService
{
    User CreateUser(UserDto newUser);
    User GetUserById(int userId);
    IEnumerable<User> GetAllUsers();
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