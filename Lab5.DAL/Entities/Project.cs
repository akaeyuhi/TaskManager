namespace Lab5.DAL.Models;

public class Project
{
    public int Id { get; set; }
    public ICollection<User>? Team { get; set; } = null;
    public ICollection<Task>? ProjectTasks { get; set; } = null;

    public Project()
    {
        Team = new List<User>();
        ProjectTasks = new List<Task>();
    }
}