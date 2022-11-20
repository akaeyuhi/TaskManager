namespace Lab5.DAL.Entities;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public Task? CurrentTask { get; set; }

    public bool Busyness { get; set; } = false;

    public int? ProjectId { get; set; }
    public Project Project { get; set; }
}