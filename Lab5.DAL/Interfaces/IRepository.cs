namespace Lab5.DAL.Interfaces;

public interface IRepository<T>
{
    IEnumerable<T> GetAll();
    T GetById(int id);
    void Add(T item);
    void Update(T item);
    void Delete(int itemId);
    void Save();
}