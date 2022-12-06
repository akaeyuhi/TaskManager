using Lab5.DAL.EF;
using Lab5.DAL.Repositories;
namespace Lab5.DAL.UnitOfWork;

public class UnitOfWork : IDisposable
{
    private readonly ManagerContext _db;
    private bool _disposed;

    public UnitOfWork(ManagerContext context)
    {
        _db = context;
        Projects = new ProjectRepository(_db);
        Tasks = new TaskRepository(_db);
        Users = new UserRepository(_db);
    }

    public ProjectRepository Projects { get; }

    public TaskRepository Tasks { get; }

    public UserRepository Users { get; }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public void Save()
    {
        _db.SaveChanges();
    }

    public virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing) _db.Dispose();
            _disposed = true;
        }
    }
}