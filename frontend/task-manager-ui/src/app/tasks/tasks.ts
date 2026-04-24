import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
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

  addTaskFormOpen: string | null = null; // 'To-Do', 'In Progress', 'Complete', or null

  openAddTaskForm(column: string) {
    this.addTaskFormOpen = column;
    this.newTask = { title: '', description: '', status: column, dueDate: '' };
  }

  closeAddTaskForm() {
    this.addTaskFormOpen = null;
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = newStatus;
      this.updateStatus(task);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

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
          this.loadTasks();
          this.newTask = { title: '', description: '', status: this.newTask.status, dueDate: '' };
          this.closeAddTaskForm();
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
