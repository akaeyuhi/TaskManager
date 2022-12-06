namespace Lab5.DAL.Interfaces;

public interface IUnitOfWork: IDisposable
{
    void Save();
}