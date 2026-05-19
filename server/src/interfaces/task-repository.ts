import type { Task, TaskDocument, UpdateTask } from "./task.js";

export interface TaskRepository {
  findAll(): Promise<TaskDocument[]>;
  findById(id: string): Promise<TaskDocument | null>;
  create(task: Task): Promise<TaskDocument>;
  delete(id: string): Promise<boolean>;
  update(taskUpdate: UpdateTask): Promise<boolean>;
}
