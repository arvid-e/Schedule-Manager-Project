import { useEffect, useState } from 'react';
import type { Task } from '../../interfaces/task';
import { deleteTask } from '../../services/task-service';
import CreateTask from '../CreateTask/CreateTask';
import styles from './WeekDay.module.css';

interface WeekDayProps {
  tasks: Task[];
  days: Date[];
  dayOfTheWeek: string;
  weekdayNumber: number;
}

function deleteTaskById(id: string, tasks: Task[]): Task[] {
  const updatedTasks: Task[] = [];

  for (const task of tasks) {
    if (task._id !== id) {
      updatedTasks.push(task);
    }
  }

  return updatedTasks;
}

function WeekDay({ dayOfTheWeek, weekdayNumber, tasks, days }: WeekDayProps) {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setCurrentTasks(deleteTaskById(taskId, tasks));
  };

  return (
    <>
      <div className={styles.dayOfTheWeek}>
        <div className={styles.weekdayHeader}>
          <div>{dayOfTheWeek}</div>
          <div>{new Date(days[weekdayNumber]).getUTCDate().toString()}</div>
        </div>
        {currentTasks.length > 0 ? (
          <div className={styles.tasksContainer}>
            {currentTasks.map((task) => (
              <div className={styles.task}>
                <p className="text">{task.title}</p>
                <p className="text">{task.description}</p>
                <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        <CreateTask date={days[weekdayNumber]} />
      </div>
    </>
  );
}

export default WeekDay;
