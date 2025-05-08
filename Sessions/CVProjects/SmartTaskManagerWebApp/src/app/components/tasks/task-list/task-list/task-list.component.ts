import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ProjectService } from '../../../services/project.service';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedProject: Project | null = null;
  projectId: string | null = null;
  statusFilter: string = 'all';
  priorityFilter: string = 'all';
  searchTerm: string = '';
  loading: boolean = true;

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'] || null;
      this.loadTasks();
      if (this.projectId) {
        this.loadProjectDetails();
      }
    });
  }

  loadTasks(): void {
    this.loading = true;

    if (this.projectId) {
      this.taskService.getTasksByProject(this.projectId).subscribe(
        (tasks) => {
          this.tasks = tasks;
          this.applyFilters();
          this.loading = false;
        },
        (error) => {
          console.error('Error loading tasks', error);
          this.loading = false;
        }
      );
    } else {
      this.taskService.getTasks().subscribe(
        (tasks) => {
          this.tasks = tasks;
          this.applyFilters();
          this.loading = false;
        },
        (error) => {
          console.error('Error loading tasks', error);
          this.loading = false;
        }
      );
    }
  }

  loadProjectDetails(): void {
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(
        (project) => {
          this.selectedProject = project;
        },
        (error) => {
          console.error('Error loading project details', error);
        }
      );
    }
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: {
        task: task || { status: 'pending', priority: 'medium' },
        projectId: this.projectId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  onTaskUpdated(task: Task): void {
    const index = this.tasks.findIndex((t) => t._id === task._id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.applyFilters();
    }
  }

  onTaskDeleted(taskId: string): void {
    this.tasks = this.tasks.filter((t) => t._id !== taskId);
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.tasks];

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter((task) => task.status === this.statusFilter);
    }

    // Apply priority filter
    if (this.priorityFilter !== 'all') {
      filtered = filtered.filter(
        (task) => task.priority === this.priorityFilter
      );
    }

    // Apply search term
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          (task.description && task.description.toLowerCase().includes(term))
      );
    }

    this.filteredTasks = filtered;
  }

  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }

  onPriorityFilterChange(priority: string): void {
    this.priorityFilter = priority;
    this.applyFilters();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }
}
