import { TaskRepository } from '../interfaces/task-repository.js';
import { Task, TaskDocument, UpdateTask } from '../interfaces/task.js';
import TaskModel from '../models/task-model.js';

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private tasksModel: typeof TaskModel) {}

  async findAll(): Promise<TaskDocument[]> {
    return await this.tasksModel.find();
  }

  async findById(id: string): Promise<TaskDocument | null> {
    const task = await this.tasksModel.findById(id);
    if (task) {
      return task.toObject();
    }
    return task;
  }

  async create(task: Task): Promise<TaskDocument> {
    return (await this.tasksModel.create(task)).toObject();
  }

  async delete(_id: string): Promise<boolean> {
    const deleted = await this.tasksModel.deleteOne({ _id });
    return deleted.deletedCount > 0;
  }

  async update(updateTask: UpdateTask): Promise<boolean> {
    const { _id, ...updateFields } = updateTask;
    const updated = await this.tasksModel.updateOne(
      { _id },
      { $set: updateFields },
    );
    return updated.modifiedCount > 0;
  }
}
