namespace Lab5.BLL.DTO;

public class TaskDto
{
    public string Description { get; set; } = "";
    public string Name { get; set; } = "";
    public bool Priority { get; set; } = false;
    public string Status { get; set; } = "created";
    public int? UserId { get; set; } = null;
    public int? ProjectId { get; set; } = null;
}