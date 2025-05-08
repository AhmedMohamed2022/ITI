import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent {
  projectForm: FormGroup;
  isEditMode: boolean;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    this.isEditMode = !!data.project._id;

    this.projectForm = this.fb.group({
      name: [data.project.name || '', Validators.required],
      description: [data.project.description || ''],
      color: [data.project.color || '#3f51b5'],
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.loading = true;
    const projectData: Project = {
      ...this.projectForm.value,
    };

    if (this.isEditMode) {
      this.projectService
        .updateProject(this.data.project._id!, projectData)
        .subscribe(
          (updatedProject) => {
            this.loading = false;
            this.snackBar.open('Project updated successfully', 'Close', {
              duration: 3000,
            });
            this.dialogRef.close(updatedProject);
          },
          (error) => {
            this.loading = false;
            console.error('Error updating project', error);
            this.snackBar.open('Error updating project', 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      this.projectService.createProject(projectData).subscribe(
        (newProject) => {
          this.loading = false;
          this.snackBar.open('Project created successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(newProject);
        },
        (error) => {
          this.loading = false;
          console.error('Error creating project', error);
          this.snackBar.open('Error creating project', 'Close', {
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
