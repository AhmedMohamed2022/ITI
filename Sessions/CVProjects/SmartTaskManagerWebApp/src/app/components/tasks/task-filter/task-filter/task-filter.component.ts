import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent {
  @Input() statusFilter: string = 'all';
  @Input() priorityFilter: string = 'all';
  @Input() searchTerm: string = '';

  @Output() statusFilterChange = new EventEmitter<string>();
  @Output() priorityFilterChange = new EventEmitter<string>();
  @Output() searchTermChange = new EventEmitter<string>();

  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.statusFilterChange.emit(status);
  }

  onPriorityFilterChange(priority: string): void {
    this.priorityFilter = priority;
    this.priorityFilterChange.emit(priority);
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchTermChange.emit(term);
  }

  clearFilters(): void {
    this.statusFilter = 'all';
    this.priorityFilter = 'all';
    this.searchTerm = '';

    this.statusFilterChange.emit('all');
    this.priorityFilterChange.emit('all');
    this.searchTermChange.emit('');
  }
}
