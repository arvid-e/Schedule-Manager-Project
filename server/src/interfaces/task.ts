import { Document } from 'mongoose';

export interface ITask {
  title: string;
  description?: string;
  date: Date;
}

export interface IUpdateTask {
  _id: string;
  title?: string;
  description?: string;
  date: Date;
}

export interface ITaskDocument extends ITask, Document {}



