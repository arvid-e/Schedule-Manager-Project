import type { ITask, ITaskDocument, IUpdateTask } from "./task.js";

export interface ITaskService {
  getAllTasks(): Promise<ITaskDocument[]>;
  getTaskById(id: string): Promise<ITaskDocument | null>;
  createTask(task: ITask): Promise<ITaskDocument | null>;
  deleteTaskById(id: string): Promise<boolean>;
  updateTask(taskUpdate: IUpdateTask): Promise<boolean>;
}
