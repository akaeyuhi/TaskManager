using Lab5.DAL.Interfaces;
using Lab5.DAL.UnitOfWork;
using Ninject.Modules;

namespace Lab5.BLL.Infrastructure.Injections;

public class BusinessBindings : NinjectModule
{
    public override void Load()
    {
        Bind<IUnitOfWork>().To<UnitOfWork>();
    }
}