using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new();

        [HttpGet]
        public ActionResult<List<TaskItem>> GetAll()
        {
            return Ok(tasks);
        }

        [HttpPost]
        public ActionResult Add(TaskItem task)
        {
            task.Id = tasks.Count + 1;
            tasks.Add(task);
            return Ok(task);
        }
    }
}