import { ITask, ITaskDocument, IUpdateTask } from "@app/interface/task";
import { ITaskRepository } from "@app/interface/task-repository";
import { ITaskService } from "@app/interface/task-service";

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) {}

  async getAllTasks(): Promise<ITaskDocument[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<ITaskDocument | null> {
    return this.taskRepository.findById(id);
  }

  async createTask(task: ITask): Promise<ITaskDocument> {
    return this.taskRepository.create(task);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }

  async updateTask(taskData: IUpdateTask): Promise<boolean> {
    return this.taskRepository.update(taskData);
  }
}
