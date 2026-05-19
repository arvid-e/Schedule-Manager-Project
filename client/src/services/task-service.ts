export const getTasksByWeek = async (weekNumber: number) => {
  // get the correct week from weekNumber
  // get the start and end date of the week
  // fetch the tasks in that date range
  //

  

  const startDate = new Date();
  const endDate = new Date();

  const response = await fetch(`http://localhost:3000/api/v1/tasks/week`, {
    method: 'get',
    body: JSON.stringify({
      startDate,
      endDate,
    }),
  });
  const data = await response.json();

  return data;
};
