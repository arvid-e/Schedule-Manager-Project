import { Document } from 'mongoose';

export interface ITask {
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IUpdateTask {
  _id: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface ITaskDocument extends ITask, Document {}
