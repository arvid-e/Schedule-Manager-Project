import { useEffect, useState } from 'react';
import type { Task } from '../../interfaces/task';
import { createTask, deleteTask } from '../../services/task-service';
import styles from './WeekDay.module.css';

interface WeekDayProps {
  tasks: Task[];
  days: Date[];
  dayOfTheWeek: string;
  weekdayNumber: number;
}

function dateIsToday(date: Date): boolean {
  const dateToCheck = new Date(date);
  const today = new Date();

  return (
    dateToCheck.getUTCFullYear() === today.getUTCFullYear() &&
    dateToCheck.getUTCMonth() === today.getUTCMonth() &&
    dateToCheck.getUTCDate() === today.getUTCDate()
  );
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

function addTask(task: Task, tasks: Task[]) {
  const newTasks: Task[] = [...tasks];
  newTasks.push(task);
  return newTasks;
}

function WeekDay({ dayOfTheWeek, weekdayNumber, tasks, days }: WeekDayProps) {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(tasks);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const isToday = dateIsToday(days[weekdayNumber]);

  useEffect(() => {
    setCurrentTasks(tasks);
  }, [tasks]);

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setCurrentTasks(deleteTaskById(taskId, tasks));
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleCreateTask = async () => {
    const task = {
      title: title,
      description: description,
      date: days[weekdayNumber],
    };
    const newTask = await createTask(task);
    setCurrentTasks(addTask(newTask.data.task, currentTasks));
    setIsActive(false);
  };

  const handleIsActive = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <>
      <div className={isToday ? styles.dayOfTheWeekToday : styles.dayOfTheWeek}>
        <div className={styles.weekdayHeader}>
          <div>{dayOfTheWeek}</div>
          <div>{new Date(days[weekdayNumber]).getUTCDate().toString()}</div>
        </div>
        <button onClick={handleIsActive}>Create</button>
        {currentTasks.length > 0 ? (
          <div className={styles.tasksContainer}>
            {currentTasks.map((task) => (
              <div className={styles.task}>
                <p className="text">{task.title}</p>
                <p className="text">{task.description}</p>
                <button onClick={() => handleDeleteTask(task._id || '')}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}

        

        {isActive ? (
          <div className={styles.createTaskContainer}>
            <input
              value={title}
              onChange={handleTitleChange}
              type="text"
            ></input>
            <input
              value={description}
              onChange={handleDescriptionChange}
              type="text"
            ></input>
            <button onClick={handleCreateTask}>Create</button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default WeekDay;
