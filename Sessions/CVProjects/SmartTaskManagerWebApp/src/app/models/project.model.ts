export interface Project {
  _id?: string;
  name: string;
  description?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
  taskCount?: number;
}
