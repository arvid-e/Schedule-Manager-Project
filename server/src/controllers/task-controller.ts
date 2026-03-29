import { NextFunction, Request, Response } from "express";

import { ITask, IUpdateTask } from "@app/interface/task";
import { ITaskService } from "@app/interface/task-service";
import { catchAsync } from "../utils/catchAsync";

export class EventController {
  constructor(private taskService: ITaskService) {}

  public getAllTasks = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const events = await this.taskService.getAllTasks();

      res.status(200).json({
        status: "success",
        message: "Events fetched successfully!",
        data: {
          events,
        },
      });
    },
  );

  public getTaskById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const task = await this.taskService.getTaskById(id);

      res.status(201).json({
        status: "success",
        message: "Event fetched successfully!",
        data: {
          task,
        },
      });
    },
  );

  public createTask = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const taskPayload: ITask = req.body;

      const task = await this.taskService.createTask(taskPayload);

      res.status(201).json({
        status: "success",
        message: "Event created successfully!",
        data: {
          task,
        },
      });
    },
  );

  public deleteTask = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const deleted = await this.taskService.deleteTaskById(id);

      if (!deleted) {
        throw new Error("Could not delete task.");
      }

      res.status(200).json({
        status: "success",
        message: "Task deleted successfully!",
        data: {
          id,
        },
      });
    },
  );

  public updateTask = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateFields: IUpdateTask = req.body;

      const updated = await this.taskService.updateTask(updateFields);

      if (!updated) {
        throw new Error("Could not update task.");
      }

      res.status(200).json({
        status: "success",
        message: "Event edited successfully!",
        data: {
          id,
        },
      });
    },
  );
}
