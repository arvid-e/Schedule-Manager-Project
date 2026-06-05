export interface Task {
  _id: string;
  title: string;
  description?: string;
  date: Date;
}

export interface CreateTask {
  title: string;
  description?: string;
  date: Date;
}
