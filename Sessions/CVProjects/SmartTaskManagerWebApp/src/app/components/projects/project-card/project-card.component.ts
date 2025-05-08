import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project!: Project;
  @Output() projectDeleted = new EventEmitter<string>();

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  deleteProject(): void {
    if (
      confirm(
        'Are you sure you want to delete this project? All associated tasks will be orphaned.'
      )
    ) {
      this.projectService.deleteProject(this.project._id!).subscribe(
        () => {
          this.projectDeleted.emit(this.project._id);
          this.snackBar.open('Project deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error deleting project', error);
          this.snackBar.open('Error deleting project', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
