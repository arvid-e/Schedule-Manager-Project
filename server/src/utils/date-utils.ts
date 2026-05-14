/**
 * Gets the weekdays of the first week of the year that belongs to specified year.
 * 
 * @param date - Date that specified what year to use.
 * @returns - Array of dates that belongs to the first week of the year that are within the specified year.
 */
export function getFirstWeekOfTheYear(date = new Date()): Date[] {
  const sunday = 0;
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;

  let currentDay = new Date(date.getUTCFullYear(), 0, 1);
  let firstWeek = [];
  let isFirstWeek = false;

  while (firstWeek.length < 7) {
    if (
      (currentDay.getUTCDay() === monday ||
        currentDay.getUTCDay() === tuesday ||
        currentDay.getUTCDay() === wednesday ||
        currentDay.getUTCDay() === thursday) &&
      isFirstWeek === false
    ) {
      isFirstWeek = true;
    }

    if (isFirstWeek) {
      if (currentDay.getUTCDay() === sunday) {
        firstWeek.push(new Date(currentDay));
        break;
      }

      firstWeek.push(new Date(currentDay));
      currentDay.setUTCDate(currentDay.getUTCDate() + 1);
    } else {
      currentDay.setUTCDate(currentDay.getUTCDate() + 1);
    }
  }

  return firstWeek;
}

/**
 * Fills an incomplete first week of the year with the dates that belongs to the previous year.
 * 
 * @param incompleteWeek - Incomplete first week of the year.
 * @returns - The complete first week of the year.
 */
export function fillMissingDaysInWeek(incompleteWeek: Date[]): Date[] {
  if (incompleteWeek[0].getDay() === 1) {
    const fullWeek = incompleteWeek;
    return fullWeek;
  }

  const fullWeek = [...incompleteWeek];
  let missingDate = new Date(incompleteWeek[0]);

  while (fullWeek.length < 7) {
    missingDate.setUTCDate(missingDate.getUTCDate() - 1);
    fullWeek.unshift(new Date(missingDate));
  }

  return fullWeek;
}
