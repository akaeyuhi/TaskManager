using System.Data.Entity.Core;
using Lab5.DAL.EF;
using Lab5.DAL.Entities;
using Lab5.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Lab5.DAL.Repositories;

public class UserRepository : IRepository<User>
{
    private readonly ManagerContext _context;


    public UserRepository(ManagerContext context)
    {
        _context = context;
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public User GetById(int id)
    {
        var item = _context.Users.FirstOrDefault(item => item.Id == id);
        if (item != null) return item;
        throw new ObjectNotFoundException();
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
}