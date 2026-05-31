import type { Task } from '../../interfaces/task';
import styles from './WeekDay.module.css';

interface WeekDayProps {
  tasks: Task[];
  days: Date[];
  dayOfTheWeek: string;
  weekdayNumber: number;
}

function WeekDay({ dayOfTheWeek, weekdayNumber, tasks, days }: WeekDayProps) {
 
  return (
    <>
      <div className={styles.dayOfTheWeek}>
        <div className={styles.weekdayHeader}>
          <div>{dayOfTheWeek}</div>
          <div>{new Date(days[weekdayNumber]).getUTCDate().toString()}</div>
        </div>
        {tasks.length > 0 ? (
          <div className={styles.tasksContainer}>
            {tasks.map((task) => (
              <div className={styles.task}>
                <p className="text">{task.title}</p>
                <p className="text">{task.description}</p>

                <button className="delete-task-button">Complete</button>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default WeekDay;
