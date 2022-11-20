namespace Lab5.DAL.Models;

public class Task
{
    public int TaskId { get; set; }
    public string Description { get; set; } = ""; 
    public bool Priority { get; set; }
    public string Status { get; set; } = "";
}