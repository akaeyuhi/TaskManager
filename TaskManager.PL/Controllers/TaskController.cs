using Lab5.BLL.DTO;
using Lab5.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Lab5.PL.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }


    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_taskService.GetAllTasks());
    }

    // GET: api/Task/5
    [HttpGet("{id}", Name = "GetTask")]
    public IActionResult Get(int id)
    {
        var task = _taskService.GetTaskById(id);
        return task == null ? NotFound() : Ok(task);
    }

    // POST: api/Task
    [HttpPost]
    public IActionResult Post([FromBody] TaskDto value)
    {
        var createdTask = _taskService.CreateTask(value);
        return CreatedAtAction(nameof(Post), createdTask);
    }

    // PUT: api/Task/5
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody] TaskDto value)
    {
        _taskService.UpdateTask(id, value);
        return Ok();
    }


    // DELETE: api/Task/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _taskService.DeleteTask(id);
        return Ok();
    }
}