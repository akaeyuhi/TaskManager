using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Lab5.DAL.Entities;

public class Task
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Task name must be specified")]
    [StringLength(50, MinimumLength = 5, ErrorMessage = "Task name must have length from 5 to 50 symbols")]
    public string Name { get; set; } = "";

    [Required(ErrorMessage = " Task description must be specified")]
    [StringLength(200, MinimumLength = 20, ErrorMessage = "Description must have length from 20 to 200 symbols")]
    public string Description { get; set; } = "";

    public bool Priority { get; set; }
    public string Status { get; set; } = "progress";
    
    [JsonIgnore]
    public int? UserId { get; set; }
    [JsonIgnore]
    public int? ProjectId { get; set; }
}