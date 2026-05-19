import { Task } from "./task.js";

export interface Week {
  weekNumber: number;
  weekDays: WeekDay[];
}

export interface WeekDay {
  date: Date;
  tasks: Task[];
}
