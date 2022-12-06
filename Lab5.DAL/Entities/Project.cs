using System.ComponentModel.DataAnnotations;

namespace Lab5.DAL.Entities;

public class Project
{
    public Project()
    {
        Users = new List<User>();
        Tasks = new List<Task>();
    }

    [Required] public int Id { get; set; }

    [Required(ErrorMessage = "Project name must be specified")]
    [StringLength(50, MinimumLength = 5, ErrorMessage = "Name must have length from 5 to 50 symbols")]
    public string ProjectName { get; set; }

    public ICollection<User>? Users { get; set; }
    public ICollection<Task>? Tasks { get; set; }
}