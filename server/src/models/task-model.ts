import { ITaskDocument } from "../interfaces/task.js";
import { Schema, model } from "mongoose";

const taskSchema = new Schema<ITaskDocument>(
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
    time: {
      type: String,
    },
    completed: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  },
);

const Task = model<ITaskDocument>("Task", taskSchema);
export default Task;
