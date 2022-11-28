using System.Data.SqlTypes;
using Lab5.DAL.EF;
using Lab5.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Task = Lab5.DAL.Entities.Task;

namespace Lab5.DAL.Repositories;

public class TaskRepository : IRepository<Task>, IDisposable
{
    private readonly ApplicationContext _context;

    private bool _disposed;


    public TaskRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public IEnumerable<Task> GetAll()
    {
        return _context.Tasks.ToList();
    }

    public Task GetById(int id)
    {
        var item = _context.Tasks.Find(id);
        if (item != null) return item;
        throw new SqlNullValueException();
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

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
            if (disposing)
                _context.Dispose();
        _disposed = true;
    }
}