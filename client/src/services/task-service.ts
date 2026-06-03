import type { Task } from '../interfaces/task';

export const getWeek = async (weekNumber: number) => {
  const response = await fetch(`/api/v1/tasks/week/${weekNumber}`);
  const data = await response.json();

  return data.data;
};

export const createTask = async (task: Task) => {
  const response = await fetch(`/api/v1/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      date: task.date,
    }),
  });
  const data = await response.json();

  return data;
};
