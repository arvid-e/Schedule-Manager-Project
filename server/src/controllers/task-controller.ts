import { Request, Response } from 'express';

import { ITaskService } from '../interfaces/task-service.js';
import { ITask, IUpdateTask } from '../interfaces/task.js';
import { catchAsync } from '../utils/catch-async.js';

export class TaskController {
  constructor(private taskService: ITaskService) {}

  getAll = catchAsync(async (req: Request, res: Response) => {
    const events = await this.taskService.getAllTasks();

    res.status(200).json({
      status: 'success',
      message: 'Events fetched successfully!',
      data: {
        events,
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
    const taskPayload: ITask = req.body;

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
    const updateFields: IUpdateTask = req.body;

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
