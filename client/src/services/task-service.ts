import type { CreateTask } from '../interfaces/task';

export const getWeek = async (weekNumber: number) => {
  const response = await fetch(`/api/v1/tasks/week/${weekNumber}`);
  const data = await response.json();

  return data.data;
};

export const createTask = async (task: CreateTask) => {
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

export const deleteTask = async (taskId: string) => {
  const response = await fetch(`/api/v1/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};

export const completeTask = async(taskId: string) => {
  const response = await fetch(`/api/v1/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json();

  return data;
}
