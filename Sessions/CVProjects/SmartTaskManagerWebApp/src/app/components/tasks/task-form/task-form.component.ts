import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean;
  projects: Project[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task; projectId?: string }
  ) {
    this.isEditMode = !!data.task._id;

    this.taskForm = this.fb.group({
      title: [data.task.title || '', Validators.required],
      description: [data.task.description || ''],
      status: [data.task.status || 'pending', Validators.required],
      priority: [data.task.priority || 'medium', Validators.required],
      projectId: [data.task.projectId || data.projectId || ''],
      dueDate: [data.task.dueDate ? new Date(data.task.dueDate) : null],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error loading projects', error);
        this.snackBar.open('Error loading projects', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    const taskData: Task = {
      ...this.taskForm.value,
    };

    if (this.isEditMode) {
      this.taskService.updateTask(this.data.task._id!, taskData).subscribe(
        (updatedTask) => {
          this.loading = false;
          this.snackBar.open('Task updated successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(updatedTask);
        },
        (error) => {
          this.loading = false;
          console.error('Error updating task', error);
          this.snackBar.open('Error updating task', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.taskService.createTask(taskData).subscribe(
        (newTask) => {
          this.loading = false;
          this.snackBar.open('Task created successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(newTask);
        },
        (error) => {
          this.loading = false;
          console.error('Error creating task', error);
          this.snackBar.open('Error creating task', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
