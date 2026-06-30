import { Schema, model } from 'mongoose';
import { TaskDocument } from '../interfaces/task.js';

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = model<TaskDocument>('Task', taskSchema);
export default Task;
