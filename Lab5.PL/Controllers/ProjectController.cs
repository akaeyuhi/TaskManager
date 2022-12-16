using Lab5.BLL.DTO;
using Lab5.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Lab5.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IUserService _userService;
        private readonly ITaskService _taskService;

        public ProjectController(IProjectService projectService, IUserService userService, ITaskService taskService)
        {
            _projectService = projectService;
            _userService = userService;
            _taskService = taskService;

        }
        
        // GET: api/Project
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_projectService.GetAllProjects());
        }

        // GET: api/Project/5
        [HttpGet("{id}", Name = "GetProject")]
        public IActionResult Get(int id)
        {
            return Ok(_projectService.GetProjectById(id));
        }

        // POST: api/Project
        [HttpPost]
        public IActionResult Post([FromBody] ProjectDto projectDto)
        {
            var createdProject = _projectService.CreateProject(projectDto);
            return CreatedAtAction(nameof(Post), createdProject);
        }

        // PUT: api/Project/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProjectDto projectDto)
        {
            _projectService.UpdateProject(id, projectDto);
            return Ok();
        }

        [HttpPut("addUsers/{id}")]
        public IActionResult PutUsers(int id, [FromBody] IEnumerable<int> userIds)
        {
            var users = userIds.Select(userId => _userService.GetUserById(userId)).ToList();
            _projectService.AddUsers(id, users);
            return Ok();
        }
        
        [HttpPut("addUser/{id}")]
        public IActionResult PutUser(int id, [FromBody] int userId)
        {
            _projectService.AddUsers(id, _userService.GetUserById(userId));
            return Ok();
        }
        
        [HttpPut("addTasks/{id}")]
        public IActionResult PutTasks(int id, [FromBody] IEnumerable<int> taskIds)
        {
            var tasks = taskIds.Select(userId => _taskService.GetTaskById(userId)).ToList();
            _projectService.AddTasks(id, tasks);
            return Ok();
        }
        
        [HttpPut("addUser/{id}")]
        public IActionResult PutTask(int id, [FromBody] int taskId)
        {
            _projectService.AddTasks(id, _taskService.GetTaskById(taskId));
            return Ok();
        }
        
        [HttpPut("assignTasks")]
        public IActionResult Put(int id)
        {
            var project = _projectService.GetProjectById(id);
            var tasks = project.Tasks.Where(task => task.Priority && task.Status != "completed" && task.UserId == null);
            foreach (var projectUser in project.Users)
            {
                if(!projectUser.Busyness) projectUser.TaskId = tasks.FirstOrDefault().Id;
            }
            return Ok();
        }

        // DELETE: api/Project/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectService.DeleteProject(id);
            return Ok();
        }
    }
}
