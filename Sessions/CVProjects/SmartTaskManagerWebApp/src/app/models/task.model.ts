export interface Task {
  _id?: string;
  title: string;
  description?: string;
  projectId?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  assignedTo?: string;
}
