using Lab5.BLL.DTO;
using Lab5.BLL.Interfaces;
using Lab5.PL.DTO;
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
        public IActionResult PutUsers(int id, [FromBody] UserIdsDto idsDto)
        {
            var users = idsDto.UserIds.Select(userId => _userService.GetUserById(userId)).ToList();
            if (users.Contains(null)) return NotFound("Users with specified id was not found");
            _projectService.AddUsers(id, users!);
            return Ok();
        }
        
        [HttpPut("addUser/{id}")]
        public IActionResult PutUser(int id, [FromBody] UserIdDto idDto)
        {
            var user = _userService.GetUserById(idDto.UserId);
            if (user == null) return NotFound("Task with specified id was not found");
            _projectService.AddUsers(id, user);
            return Ok();
        }
        
        
        [HttpDelete("deleteUser/{id}")]
        public IActionResult DeleteUser(int id, [FromBody] UserIdDto idDto)
        {
            var user = _userService.GetUserById(idDto.UserId);
            if (user == null) return NotFound("User with specified id was not found");
            _projectService.DeleteUser(id, user);
            return Ok();
        }
        
        [HttpDelete("deleteTask/{id}")]
        public IActionResult DeleteTask(int id, [FromBody] TaskIdDto idDto)
        {
            var task = _taskService.GetTaskById(idDto.TaskId);
            if (task == null) return NotFound("Task with specified id was not found");
            _projectService.DeleteTask(id, task);
            return Ok();
        }
        
        [HttpDelete("deleteTask/{id}")]
        public IActionResult DeleteTask(int id)
        {
            _projectService.ClearTasks(id);
            return Ok();
        }
        
        [HttpDelete("deleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _projectService.ClearUsers(id);
            return Ok();
        }
        
        [HttpPut("addTasks/{id}")]
        public IActionResult PutTasks(int id, [FromBody] TaskIdsDto idsDto)
        {
            var tasks = idsDto.TaskIds.Select(taskId => _taskService.GetTaskById(taskId)).ToList();
            if (tasks.Contains(null)) return NotFound("Tasks with specified id was not found");
            _projectService.AddTasks(id, tasks!);
            return Ok();
        }
        
        [HttpPut("addUser/{id}")]
        public IActionResult PutTask(int id, [FromBody] TaskIdDto idDto)
        {
            var task = _taskService.GetTaskById(idDto.TaskId);
            if (task == null) return NotFound("Task with specified id was not found");
            _projectService.AddTasks(id, task);
            return Ok();
        }
        
        [HttpPut("assignTasks/{id}")]
        public IActionResult Put(int id)
        {
            var project = _projectService.GetProjectById(id);
            if (project == null) return NotFound("Project with specified id was not found");
            var tasks = project.Tasks.Where(task => task.Priority && task.Status != "completed" && task.UserId == null);
            foreach (var projectUser in project.Users)
            {
                var setTask = tasks.FirstOrDefault();
                if(!projectUser.Busyness && setTask != null) _userService.AssignTask(projectUser, setTask);
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
