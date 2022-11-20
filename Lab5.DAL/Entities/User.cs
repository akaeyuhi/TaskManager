using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab5.DAL.Models;

public class User
{
    public int Id { get; set; }
    
    public Task? CurrentTask { get; set; }
    
    public bool Busyness { get; set; } = false;

    public int? ProjectId { get; set; }
    public Project Project { get; set; }
}