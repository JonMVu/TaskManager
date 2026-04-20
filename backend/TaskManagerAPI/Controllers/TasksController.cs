using Microsoft.AspNetCore.Mvc;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new()
        {
            new TaskItem { Id = 1, Title = "Design homepage", Description = "Create wireframes for the main page", Status = "To-Do", DueDate = DateTime.Now.AddDays(5) },
            new TaskItem { Id = 2, Title = "Implement login", Description = "Add authentication system", Status = "In Progress", DueDate = DateTime.Now.AddDays(10) },
            new TaskItem { Id = 3, Title = "Write unit tests", Description = "Cover core functionality with tests", Status = "Complete", DueDate = DateTime.Now.AddDays(-2) },
            new TaskItem { Id = 4, Title = "Setup database", Description = "Configure PostgreSQL connection", Status = "To-Do", DueDate = DateTime.Now.AddDays(7) },
            new TaskItem { Id = 5, Title = "Optimize images", Description = "Compress and resize site images", Status = "In Progress", DueDate = DateTime.Now.AddDays(3) },
            new TaskItem { Id = 6, Title = "Deploy to production", Description = "Push code to live server", Status = "Complete", DueDate = DateTime.Now.AddDays(-5) },
            new TaskItem { Id = 7, Title = "Fix mobile layout", Description = "Ensure responsive design works", Status = "To-Do", DueDate = DateTime.Now.AddDays(4) },
            new TaskItem { Id = 8, Title = "Add user profiles", Description = "Implement profile pages", Status = "In Progress", DueDate = DateTime.Now.AddDays(12) },
            new TaskItem { Id = 9, Title = "Security audit", Description = "Review and fix vulnerabilities", Status = "Complete", DueDate = DateTime.Now.AddDays(-1) },
            new TaskItem { Id = 10, Title = "Write documentation", Description = "Create user and API docs", Status = "To-Do", DueDate = DateTime.Now.AddDays(14) }
        };

        [HttpGet]
        public ActionResult<List<TaskItem>> GetAll()
        {
            return Ok(tasks);
        }

        [HttpPost]
        public ActionResult Add(TaskItem task)
        {
            task.Id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1;
            tasks.Add(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, TaskItem updatedTask)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.Status = updatedTask.Status;
            task.DueDate = updatedTask.DueDate;
            return Ok(task);
        }
    }
}