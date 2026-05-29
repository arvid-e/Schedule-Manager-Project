import { useEffect, useState } from 'react';
import Week from '../Week/Week';

import type { Task } from '../../interfaces/task';
import { getWeek } from '../../services/task-service';
import styles from './Dashboard.module.css';
import { getCurrentDateAndYear } from '../../utils/date-utils';


function Dashboard() {
  const [weekNumber, setWeekNumber] = useState<string>('');
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
      <div className={styles.navBar}>
        <div>{weekNumber}</div>

        <button onClick={() => prevWeek()}>Prev</button>
        <button onClick={() => nextWeek()}>Next</button>

        <input
          type="text"
          placeholder="Enter week number..."
          onChange={(e) => setInput(e.target.value)}
        ></input>

        <button onClick={() => handleClick()}>Change week</button>
      </div>

      <div>
        <div>{getCurrentDateAndYear(days)}</div>
      </div>

      <Week days={days} tasks={tasks} />
    </>
  );
}

export default Dashboard;
