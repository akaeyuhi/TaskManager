namespace Lab5.DAL.Models;

public class Project
{
    public int Id { get; set; }
    
    public string ProjectName { get; set; }
    public ICollection<User>? Users { get; set; }
    public ICollection<Task>? Tasks { get; set; }

    public Project()
    {
        Users = new List<User>();
        Tasks = new List<Task>();
    }
}