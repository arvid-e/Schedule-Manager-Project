import { Request, Response } from 'express';

import { TaskService } from '../interfaces/task-service.js';
import { Task, UpdateTask } from '../interfaces/task.js';
import { catchAsync } from '../utils/catch-async.js';

export class TaskController {
  constructor(private taskService: TaskService) {}

  getAll = catchAsync(async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks();

    res.status(200).json({
      status: 'success',
      message: 'Events fetched successfully!',
      data: {
        tasks,
      },
    });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await this.taskService.getTaskById(id);

    res.status(200).json({
      status: 'success',
      message: 'Event fetched successfully!',
      data: {
        task,
      },
    });
  });

  create = catchAsync(async (req: Request, res: Response) => {
    const taskPayload: Task = req.body;

    const task = await this.taskService.createTask(taskPayload);

    res.status(201).json({
      status: 'success',
      message: 'Event created successfully!',
      data: {
        task,
      },
    });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await this.taskService.deleteTaskById(id);

    if (!deleted) {
      throw new Error('Could not delete task.');
    }

    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully!',
      data: {
        id,
      },
    });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateFields: UpdateTask = req.body;

    const updated = await this.taskService.updateTask(updateFields);

    if (!updated) {
      throw new Error('Could not update task.');
    }

    res.status(200).json({
      status: 'success',
      message: 'Event edited successfully!',
      data: {
        id,
      },
    });
  });
}
