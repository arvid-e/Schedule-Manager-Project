interface IDate {
  date: Date;
  week: number;
}

export const getTasks = async (userId: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/tasks/${userId}`);
  const data = await response.json();

  return data;
}

export const createEmptyWeekgrid = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  // get year
  // create dates for everyday of the year and add to array
  // add week number to all dates


  // set date to januari 1
  // add date to array and add until year is changed



  

}