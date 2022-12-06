using System.Data.Entity.Core;
using Lab5.DAL.EF;
using Lab5.DAL.Entities;
using Lab5.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

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
        return _context.Projects.ToList();
    }

    public Project? GetById(int id)
    {
        return _context.Projects.FirstOrDefault(item => item.Id == id);
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
        var project = _context.Projects.Find(itemId);
        if (project != null) _context.Projects.Remove(project);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}