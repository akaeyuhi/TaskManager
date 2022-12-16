using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Lab5.DAL.Entities;

public class User
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Name must be specified")]
    [StringLength(50, MinimumLength = 5, ErrorMessage = "Name must have length from 5 to 50 symbols")]
    public string Name { get; set; } = "";
    
    public Task? Task { get; set; }

    public bool Busyness { get; set; }

    [JsonIgnore]
    public int? ProjectId { get; set; }
}