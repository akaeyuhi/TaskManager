namespace Lab5.DAL.Models;

public class Task
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public bool Priority { get; set; }
    public string Status { get; set; } = "";

    public int? UserId { get; set; }
    public virtual User User { get; set; }
    
    public int? ProjectId { get; set; }
    public virtual Project Project { get; set; }
}