using System.Data.Entity.Core;
using Lab5.DAL.EF;
using Lab5.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.Repositories;

public class TaskRepository : IRepository<Task>
{
    private readonly ManagerContext _context;


    public TaskRepository(ManagerContext context)
    {
        _context = context;
    }

    public IEnumerable<Task> GetAll()
    {
        return _context.Tasks.ToList();
    }

    public Task GetById(int id)
    {
        var item = _context.Tasks.FirstOrDefault(item => item.Id == id);
        if (item != null) return item;
        throw new ObjectNotFoundException();
    }

    public void Add(Task item)
    {
        _context.Tasks.Add(item);
    }

    public void Update(Task item)
    {
        _context.Entry(item).State = EntityState.Modified;
    }

    public void Delete(int itemId)
    {
        var task = _context.Tasks.Find(itemId);
        if (task != null) _context.Tasks.Remove(task);
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}