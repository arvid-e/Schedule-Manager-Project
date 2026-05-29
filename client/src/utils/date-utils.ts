export function getCurrentDateAndYear(days: Date[]): string {
  const foundYears: string[] = [];
  const foundMonths: string[] = [];
  let yearAndMonth = '';

  if (days.length > 0) {
    for (const day of days) {
      const year = new Date(day).getUTCFullYear();
      const yearStr = year.toString();

      const month = new Date(day).getUTCMonth();
      const monthStr = convertNumberToMonthString(month);
      console.log(monthStr);

      if (!foundYears.includes(yearStr)) {
        foundYears.push(yearStr);
      }

      if (!foundMonths.includes(monthStr)) {
        foundMonths.push(monthStr);
      }
    }

    if (foundYears.length > 1) {
      yearAndMonth += `${foundYears[0]} ${foundMonths[0]} - ${foundYears[1]} ${foundMonths[1]}`;
    } else if (foundMonths.length > 1) {
      yearAndMonth += `${foundMonths[0]} - ${foundMonths[1]} ${foundYears[0]}`;
    } else {
      yearAndMonth += `${foundMonths[0]} ${foundYears[0]}`;
    }
    return yearAndMonth;
  }

  return yearAndMonth;
}

function convertNumberToMonthString(monthNumber: number): string {
  let month = '';

  switch (monthNumber) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'Mars';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'Oktober';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
  }

  return month;
}
