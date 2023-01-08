using Lab5.DAL.EF;
using Lab5.DAL.Entities;
using Lab5.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.Repositories;

public class ProjectRepository : IRepository<Project>
{
    private readonly ManagerContext _context;


    public ProjectRepository(ManagerContext context)
    {
        _context = context;
    }


    public IEnumerable<Project> GetAll()
    {
        return _context.Projects
            .Include(project => project.Tasks)
            .Include(project => project.Users)
            .ToList();
    }

    public Project? GetById(int id)
    {
        return _context.Projects
            .Include(project => project.Tasks)
            .Include(project => project.Users)
            .FirstOrDefault(item => item.Id == id);
    }

    public void Add(Project item)
    {
        _context.Projects.Add(item);
    }

    public void Update(Project item)
    {
        _context.Entry(item).State = EntityState.Modified;
    }

    public void Delete(int itemId)
    {
        var project = GetById(itemId);
        if (project == null) return;
        foreach (var user in project.Users)
        {
            user.Task = null;
        }
        project.Tasks.Clear();
        project.Users.Clear();
        _context.Projects.Remove(project);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}