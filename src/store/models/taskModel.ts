export interface TaskModel {
  id: number; // auto gen by id AUTO_INCREMENT
  name: string;
  description: string;
  status: string;
  dueDate: string;
  createdAt: string; // Autogenerates when creating a task
}