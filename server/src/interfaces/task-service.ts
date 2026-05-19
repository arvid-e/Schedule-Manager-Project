import type { Task, TaskDocument, UpdateTask } from "./task.js";

export interface TaskService {
  getAllTasks(): Promise<TaskDocument[]>;
  getTaskById(id: string): Promise<TaskDocument | null>;
  createTask(task: Task): Promise<TaskDocument | null>;
  deleteTaskById(id: string): Promise<boolean>;
  updateTask(taskUpdate: UpdateTask): Promise<boolean>;
}
