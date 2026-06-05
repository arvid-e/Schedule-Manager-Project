import { useEffect, useState } from 'react';
import Week from '../Week/Week';

import type { Task } from '../../interfaces/task';
import { getWeek } from '../../services/task-service';
import {
  getCurrentDateAndYear,
  getWeekNumberByDate,
} from '../../utils/date-utils';
import styles from './Dashboard.module.css';

function Dashboard() {
  const currentWeek = getWeekNumberByDate().toString();
  const [weekNumber, setWeekNumber] = useState<string>(currentWeek);
  const [input, setInput] = useState<string>('');
  const [days, setDays] = useState<Date[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getWeekData = async () => {
      const week = await getWeek(Number(weekNumber));

      setDays(week.days);
      setTasks(week.tasks);
    };
    getWeekData();
  }, [weekNumber]);

  const handleClick = () => {
    setWeekNumber(input);
  };

  const nextWeek = () => {
    const next = Number(weekNumber) + 1;
    const nextStr = next.toString();
    setWeekNumber(nextStr);
  };

  const prevWeek = () => {
    const prev = Number(weekNumber) - 1;
    const prevStr = prev.toString();
    setWeekNumber(prevStr);
  };

  return (
    <>
      <div>
        <button onClick={() => handleClick()}>Change week</button>
        <input
          type="text"
          placeholder="Enter week number..."
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <div>{weekNumber}</div>
      </div>
      
      <div className={styles.navBar}>
        <div className={styles.changeWeekButtons}>
          <button onClick={() => prevWeek()}>Prev</button>
          <button onClick={() => nextWeek()}>Next</button>
        </div>

        <div>{getCurrentDateAndYear(days)}</div>
      </div>

      <Week days={days} tasks={tasks} />
    </>
  );
}

export default Dashboard;
