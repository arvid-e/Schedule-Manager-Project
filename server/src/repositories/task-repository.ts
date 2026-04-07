import { ITaskRepository } from "../interfaces/task-repository.js";
import { ITask, ITaskDocument, IUpdateTask } from "../interfaces/task.js";
import Task from "../models/task-model.js";


export class TaskRepository implements ITaskRepository {
  constructor(private tasksModel: typeof Task) {}

  async findAll(): Promise<ITaskDocument[]> {
    return await this.tasksModel.find();
  }

  async findById(id: string): Promise<ITaskDocument | null> {
    const task = await this.tasksModel.findById(id);
    if (task) {
      return task.toObject();
    }
    return task;
  }

  async create(task: ITask): Promise<ITaskDocument> {
    return (await this.tasksModel.create(task)).toObject();
  }

  async delete(_id: string): Promise<boolean> {
    const deleted = await this.tasksModel.deleteOne({ _id });
    return deleted.deletedCount > 0;
  }

  async update(updateTask: IUpdateTask): Promise<boolean> {
    const { _id, ...updateFields } = updateTask;
    const updated = await this.tasksModel.updateOne(
      { _id },
      { $set: updateFields },
    );
    return updated.modifiedCount > 0;
  }
}
