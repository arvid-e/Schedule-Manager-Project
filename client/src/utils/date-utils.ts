import type { Week } from '../interfaces/week';

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

  const currentDay = new Date(date.getUTCFullYear(), 0, 1);
  const firstWeek = [];
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
  if (incompleteWeek[0].getUTCDay() === 1) {
    const fullWeek = incompleteWeek;
    return fullWeek;
  }

  const fullWeek = [...incompleteWeek];
  const missingDate = new Date(incompleteWeek[0]);

  while (fullWeek.length < 7) {
    missingDate.setUTCDate(missingDate.getUTCDate() - 1);
    fullWeek.unshift(new Date(missingDate));
  }

  return fullWeek;
}

/**
 * Creates a full year of weeks with week numbers, dates and empty task arrays.
 *
 * @returns - One year of week objects.
 */
export function createFullYearInWeeks() {
  const sparseFirstWeek = getFirstWeekOfTheYear();
  const fullFirstWeek = fillMissingDaysInWeek(sparseFirstWeek);

  const currentYear = fullFirstWeek[6].getUTCFullYear();
  const currentDay = fullFirstWeek[0];

  const fullYearOfWeeks = [];
  let weekNumber = 0;
  let isFirstWeek = true;

  while (currentDay.getUTCFullYear() < currentYear + 1) {
    const week: Week = {
      weekNumber: 0,
      weekDays: [],
    };

    for (let i = 0; i < 7; i++) {
      if (isFirstWeek) {
        week.weekDays.push(new Date(currentDay));
        isFirstWeek = false;
      } else {
        currentDay.setUTCDate(currentDay.getUTCDate() + 1);
        week.weekDays.push(new Date(currentDay));
      }
    }

    weekNumber += 1;
    week.weekNumber = weekNumber;

    fullYearOfWeeks.push(week);
  }

  return fullYearOfWeeks;
}

export function getWeekByNumber(weekNumber: number): Date[] {
  const allWeeks = createFullYearInWeeks();
  for (const week of allWeeks) {
    if (week.weekNumber === weekNumber) {
      return week.weekDays;
    }
  }

  return [];
}

export function getWeekNumberByDate(date: Date = new Date()): number {
  const yearInWeeks = createFullYearInWeeks();
  let weekNumber = 1;

  for (const week of yearInWeeks) {
    week.weekDays.map((day) => {
      const dateToFindShort = `${day.getUTCFullYear()}${day.getUTCMonth()}${day.getUTCDate()}`;
      const currentDateShort = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}`;

      if (dateToFindShort == currentDateShort) {
        weekNumber = week.weekNumber;
      }
    });
  }

  if (weekNumber == 1) {
    console.log('Couldnt find currrent date');
  }

  return weekNumber;
}

export function dateIsToday(date: Date): boolean {
  const dateToCheck = new Date(date);
  const today = new Date();

  return (
    dateToCheck.getUTCFullYear() === today.getUTCFullYear() &&
    dateToCheck.getUTCMonth() === today.getUTCMonth() &&
    dateToCheck.getUTCDate() === today.getUTCDate()
  );
}
