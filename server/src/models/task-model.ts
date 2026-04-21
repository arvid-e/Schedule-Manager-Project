import { Schema, model } from 'mongoose';
import { ITaskDocument } from '../interfaces/task.js';

const taskSchema = new Schema<ITaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Task = model<ITaskDocument>('Task', taskSchema);
export default Task;
