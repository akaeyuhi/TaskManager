using System.Data.SqlTypes;
using Lab5.DAL.EF;
using Lab5.DAL.Entities;
using Lab5.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Lab5.DAL.Repositories;

public class UserRepository : IRepository<User>, IDisposable
{
    private readonly ApplicationContext _context;

    private bool _disposed;


    public UserRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public User GetById(int id)
    {
        var item = _context.Users.Find(id);
        if (item != null) return item;
        throw new SqlNullValueException();
    }

    public void Add(User item)
    {
        _context.Users.Add(item);
    }

    public void Update(User item)
    {
        _context.Entry(item).State = EntityState.Modified;
    }

    public void Delete(int itemId)
    {
        var task = _context.Users.Find(itemId);
        if (task != null) _context.Users.Remove(task);
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