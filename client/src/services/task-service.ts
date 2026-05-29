export const getWeek = async (weekNumber: number) => {
  const response = await fetch(`/api/v1/tasks/week/${weekNumber}`);
  const data = await response.json();

  return data.data;
};
