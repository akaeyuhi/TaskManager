namespace Lab5.BLL.DTO;

public class UserDto
{
    public string Name { get; set; }
    public bool Busyness { get; set; } = false;
    public int? CurrentTaskId { get; set; } = null;
    public int? ProjectId  { get; set; } = null;
}