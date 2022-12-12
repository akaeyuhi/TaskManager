using Lab5.BLL.Infrastructure.Injections;
using Lab5.BLL.Interfaces;
using Lab5.BLL.Services;
using Lab5.DAL.EF;
using Lab5.DAL.Interfaces;
using Lab5.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Ninject;
using Ninject.Web.WebApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ManagerContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();

// var kernel = new StandardKernel(new BusinessBindings());
// var dependencyResolver = new NinjectDependencyResolver(kernel);
// dependencyResolver.BeginScope();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();