import { Request, Response } from 'express';

import { TaskService } from '../interfaces/task-service.js';
import { Task, UpdateTask } from '../interfaces/task.js';
import { getWeekByNumber } from '../utils/date-utils.js';

export class TaskController {
  constructor(private taskService: TaskService) {}

  getAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks();

    res.status(200).json({
      status: 'success',
      message: 'Tasks fetched successfully!',
      data: tasks,
    });
  };

  getWeek = async (req: Request, res: Response) => {
    const { id } = req.params;

    const days = getWeekByNumber(Number(id));
    const startDate = days[0];
    const endDate = days[6];

    const tasks = await this.taskService.getTasksByDates(startDate, endDate);

    res.status(200).json({
      status: 'success',
      message: 'Tasks fetched successfully!',
      data: {
        tasks,
        days
      },
    });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await this.taskService.getTaskById(id);

    res.status(200).json({
      status: 'success',
      message: 'Task fetched successfully!',
      data: {
        task,
      },
    });
  };

  create = async (req: Request, res: Response) => {
    const { title, description, date } = req.body;

    const task = await this.taskService.createTask({title, description, date});

    res.status(201).json({
      status: 'success',
      message: 'Task created successfully!',
      data: {
        task,
      },
    });
  };

  delete = async (req: Request, res: Response) => {
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
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateFields: UpdateTask = req.body;

    const updated = await this.taskService.updateTask(updateFields);

    if (!updated) {
      throw new Error('Could not update task.');
    }

    res.status(200).json({
      status: 'success',
      message: 'Task edited successfully!',
      data: {
        id,
      },
    });
  };
}
