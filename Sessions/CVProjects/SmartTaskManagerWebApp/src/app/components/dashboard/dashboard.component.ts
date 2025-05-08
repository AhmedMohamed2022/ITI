// import { Component, OnInit } from '@angular/core';
// import { TaskService } from '../../services/task.service';
// import { ProjectService } from '../../services/project.service';
// import { Task } from '../../models/task.model';
// import { Project } from '../../models/project.model';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../../models/user.model';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss'],
// })
// export class DashboardComponent implements OnInit {
//   recentTasks: Task[] = [];
//   projects: Project[] = [];
//   currentUser: User | null = null;
//   taskStats = {
//     total: 0,
//     completed: 0,
//     pending: 0,
//     inProgress: 0,
//   };
//   loading = true;

//   constructor(
//     private taskService: TaskService,
//     private projectService: ProjectService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.currentUser = this.authService.getCurrentUser();
//     this.loadDashboardData();
//   }

//   loadDashboardData(): void {
//     this.loading = true;

//     // Load recent tasks
//     this.taskService.getTasks({ limit: 5, sort: '-createdAt' }).subscribe(
//       (tasks) => {
//         this.recentTasks = tasks;
//         this.calculateTaskStats(tasks);
//         this.loading = false;
//       },
//       (error) => {
//         console.error('Error loading tasks', error);
//         this.loading = false;
//       }
//     );

//     // Load projects
//     this.projectService.getProjects().subscribe(
//       (projects) => {
//         this.projects = projects;
//       },
//       (error) => {
//         console.error('Error loading projects', error);
//       }
//     );
//   }

//   calculateTaskStats(tasks: Task[]): void {
//     this.taskStats.total = tasks.length;
//     this.taskStats.completed = tasks.filter(
//       (t) => t.status === 'completed'
//     ).length;
//     this.taskStats.pending = tasks.filter((t) => t.status === 'pending').length;
//     this.taskStats.inProgress = tasks.filter(
//       (t) => t.status === 'in-progress'
//     ).length;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  recentTasks: Task[] = [];
  upcomingTasks: Task[] = [];
  projects: Project[] = [];
  taskStats: any = {};
  loading = {
    recentTasks: true,
    upcomingTasks: true,
    projects: true,
    stats: true,
  };

  // Task status distribution for chart
  taskStatusData = [
    { name: 'Pending', value: 0 },
    { name: 'In Progress', value: 0 },
    { name: 'Completed', value: 0 },
  ];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRecentTasks();
    this.loadUpcomingTasks();
    this.loadProjects();
    this.loadTaskStats();
  }

  loadRecentTasks(): void {
    this.loading.recentTasks = true;
    this.taskService.getTasks({ limit: 5, sort: 'createdAt' }).subscribe(
      (tasks) => {
        this.recentTasks = tasks;
        this.loading.recentTasks = false;
      },
      (error) => {
        console.error('Error loading recent tasks', error);
        this.loading.recentTasks = false;
      }
    );
  }

  loadUpcomingTasks(): void {
    this.loading.upcomingTasks = true;
    this.taskService
      .getTasks({
        status: 'pending,in-progress',
        sort: 'dueDate',
        limit: 5,
        dueDateEnd: new Date(new Date().setDate(new Date().getDate() + 7))
          .toISOString()
          .split('T')[0],
      })
      .subscribe(
        (tasks) => {
          this.upcomingTasks = tasks;
          this.loading.upcomingTasks = false;
        },
        (error) => {
          console.error('Error loading upcoming tasks', error);
          this.loading.upcomingTasks = false;
        }
      );
  }

  loadProjects(): void {
    this.loading.projects = true;
    this.projectService.getProjects().subscribe(
      (projects) => {
        this.projects = projects.slice(0, 5);
        this.loading.projects = false;
      },
      (error) => {
        console.error('Error loading projects', error);
        this.loading.projects = false;
      }
    );
  }

  loadTaskStats(): void {
    this.loading.stats = true;
    this.taskService.getTaskStats().subscribe(
      (stats) => {
        this.taskStats = stats;

        // Update chart data
        this.taskStatusData = [
          { name: 'Pending', value: stats.pendingTasks || 0 },
          { name: 'In Progress', value: stats.inProgressTasks || 0 },
          { name: 'Completed', value: stats.completedTasks || 0 },
        ];

        this.loading.stats = false;
      },
      (error) => {
        console.error('Error loading task stats', error);
        this.loading.stats = false;
      }
    );
  }

  openTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '600px',
      data: { task: {} },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Task created successfully', 'Close', {
          duration: 3000,
        });
        this.loadRecentTasks();
        this.loadUpcomingTasks();
        this.loadTaskStats();
      }
    });
  }

  navigateToProjects(): void {
    this.router.navigate(['/projects']);
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }

  formatDueDate(date: any): string {
    if (!date) return 'No due date';

    const dueDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dueDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dueDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return dueDate.toLocaleDateString();
    }
  }
}
