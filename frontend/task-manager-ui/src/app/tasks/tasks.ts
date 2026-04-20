import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks: any[] = [];
  todoTasks: any[] = [];
  inProgressTasks: any[] = [];
  completeTasks: any[] = [];

  newTask = {
    title: '',
    description: '',
    status: 'To-Do',
    dueDate: ''
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log('Tasks loaded:', data);
        this.tasks = data;
        this.todoTasks = this.tasks.filter(t => t.status === 'To-Do');
        this.inProgressTasks = this.tasks.filter(t => t.status === 'In Progress');
        this.completeTasks = this.tasks.filter(t => t.status === 'Complete');
        console.log('Filtered tasks:', this.todoTasks.length, this.inProgressTasks.length, this.completeTasks.length);
      },
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  addTask(): void {
    if (this.newTask.title && this.newTask.description) {
      this.taskService.addTask(this.newTask).subscribe({
        next: () => {
          this.loadTasks(); // Refresh the task lists
          this.newTask = { title: '', description: '', status: 'To-Do', dueDate: '' }; // Reset form
        },
        error: (err) => console.error('Error adding task:', err)
      });
    }
  }

  updateStatus(task: any): void {
    this.taskService.updateTask(task).subscribe({
      next: () => this.loadTasks(), // Refresh after update
      error: (err) => console.error('Error updating task:', err)
    });
  }
}
