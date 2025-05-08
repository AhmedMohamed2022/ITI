import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  toggleTaskStatus(): void {
    const newStatus =
      this.task.status === 'completed' ? 'pending' : 'completed';
    this.taskService
      .updateTask(this.task._id!, { status: newStatus })
      .subscribe(
        (updatedTask) => {
          this.task = updatedTask;
          this.taskUpdated.emit(updatedTask);
          this.snackBar.open(`Task marked as ${newStatus}`, 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error updating task status', error);
          this.snackBar.open('Error updating task', 'Close', {
            duration: 3000,
          });
        }
      );
  }

  deleteTask(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task._id!).subscribe(
        () => {
          this.taskDeleted.emit(this.task._id);
          this.snackBar.open('Task deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error deleting task', error);
          this.snackBar.open('Error deleting task', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  getPriorityColor(): string {
    switch (this.task.priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  }
}
