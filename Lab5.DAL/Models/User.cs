namespace Lab5.DAL.Models;

public class User
{
    public int Id { get; set; }
    public ICollection<Task>? CurrentTasks { get; set; } = null;
    public int Busyness { get; set; } = 0;
}   