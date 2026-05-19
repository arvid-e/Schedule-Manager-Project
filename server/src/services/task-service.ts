import { TaskRepository } from "../interfaces/task-repository.js";
import { TaskService } from "../interfaces/task-service.js";
import { Task, TaskDocument, UpdateTask } from "../interfaces/task.js";

export class TaskServiceImpl implements TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<TaskDocument[]> {
    return this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<TaskDocument | null> {
    return this.taskRepository.findById(id);
  }

  async createTask(task: Task): Promise<TaskDocument> {
    return this.taskRepository.create(task);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }

  async updateTask(taskData: UpdateTask): Promise<boolean> {
    return this.taskRepository.update(taskData);
  }
}
