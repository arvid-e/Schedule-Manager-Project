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

    const week = getWeekByNumber(Number(id));
    const startDate = week[0].date;
    const endDate = week[6].date;

    const tasks = await this.taskService.getTasksByDates(startDate, endDate);

    if (tasks != null && tasks.length > 0) {
      console.log("LOAD TASKS");
      for (const task of tasks) {
        for (const day of week) {
          if (
            `${task.date.getUTCFullYear()}-${task.date.getUTCMonth()}-${task.date.getUTCDate()}` ===
            `${day.date.getUTCFullYear()}-${day.date.getUTCMonth()}-${day.date.getUTCDate()}`
          ) {
            day.tasks.push(task);
          }
        }
      }
    }


    res.status(200).json({
      status: 'success',
      message: 'Tasks fetched successfully!',
      data: week,
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
    const taskPayload: Task = req.body;

    const task = await this.taskService.createTask(taskPayload);

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
