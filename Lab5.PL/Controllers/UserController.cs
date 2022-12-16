using Lab5.BLL.DTO;
using Lab5.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Lab5.PL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        
        // GET: api/User
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userService.GetAllUsers());
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult Get(int id)
        {
            var user = _userService.GetUserById(id);
            return user == null ? NotFound() : Ok(user);
        }

        // POST: api/User
        [HttpPost]
        public IActionResult Post([FromBody] UserDto value)
        {
            var createdUser = _userService.CreateUser(value);
            return CreatedAtAction(nameof(Post), createdUser);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UserDto value)
        {
            _userService.UpdateUser(id, value);
            return Ok();
        }
        
        [HttpDelete("clearTask/{id}")]
        public IActionResult Put(int id)
        {
            _userService.ClearTask(id);
            return Ok();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.DeleteUser(id);
            return Ok();
        }
    }
}
