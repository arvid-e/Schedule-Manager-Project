import type { ITask, ITaskDocument, IUpdateTask } from "./task";

export interface ITaskRepository {
  findAll(): Promise<ITaskDocument[]>;
  findById(id: string): Promise<ITaskDocument | null>;
  create(task: ITask): Promise<ITaskDocument>;
  delete(id: string): Promise<boolean>;
  update(taskUpdate: IUpdateTask): Promise<boolean>;
}
