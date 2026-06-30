import { Document } from 'mongoose';

export interface Task {
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
}

export interface UpdateTask extends Task {
  _id: string;
}

export interface TaskDocument extends Task, Document {}



