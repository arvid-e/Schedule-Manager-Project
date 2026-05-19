import { Document } from 'mongoose';

export interface Task {
  title: string;
  description?: string;
  date: Date;
}

export interface UpdateTask {
  _id: string;
  title?: string;
  description?: string;
  date: Date;
}

export interface TaskDocument extends Task, Document {}



