import { Request, Response } from 'express';

import { TaskService } from '../interfaces/task-service.js';
import { Task, UpdateTask } from '../interfaces/task.js';
import { createFullYearInWeeks } from '../utils/date-utils.js';

export class TaskController {
  constructor(private taskService: TaskService) {}

  getAll = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getAllTasks();
    const fullYearInWeeks = createFullYearInWeeks();

    for (const task of tasks) {
      for (const week of fullYearInWeeks) {
        for (const day of week.weekDays) {
          if (
            `${day.date.getUTCFullYear()}-${day.date.getUTCMonth()}-${day.date.getUTCDate()}` ==
            `${task.date.getUTCFullYear()}-${task.date.getUTCMonth()}-${task.date.getUTCDate()}`
          ) {
            day.tasks.push(task);
          }
        }
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Events fetched successfully!',
      data: {
        tasks,
        fullYearInWeeks,
      },
    });
  };

  getByDates = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;

    const tasks = await this.taskService.getTasksByDates(startDate, endDate);

    res.status(200).json({
      status: 'success',
      message: 'Event fetched successfully!',
      data: {
        tasks,
      },
    });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await this.taskService.getTaskById(id);

    res.status(200).json({
      status: 'success',
      message: 'Event fetched successfully!',
      data: {
        task,
      },
    });
  };

  create = async (req: Request, res: Response) => {
    const taskPayload: Task = req.body;

    const task = await this.taskService.createTask(taskPayload);

    res.status(201).json({
      status: 'success',
      message: 'Event created successfully!',
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
      message: 'Event edited successfully!',
      data: {
        id,
      },
    });
  };
}
