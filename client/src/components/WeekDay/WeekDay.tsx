import { useEffect, useState } from 'react';
import type { Task } from '../../interfaces/task';
import {
  completeTask,
  createTask,
  deleteTask,
  revertTask,
} from '../../services/task-service';
import { dateIsToday } from '../../utils/date-utils';
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
    setCurrentTasks(deleteTaskById(taskId, currentTasks));
  };
  const handleCompleteTask = async (taskId: string) => {
    await completeTask(taskId);

    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: true } : task,
      ),
    );
  };

  const handleRevertTask = async (taskId: string) => {
    await revertTask(taskId);

    setCurrentTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: false } : task,
      ),
    );
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
      completed: false,
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
    <div className={isToday ? styles.dayOfTheWeekToday : styles.dayOfTheWeek}>
      {/* Header Section */}
      <div className={styles.weekdayHeader}>
        <div>{dayOfTheWeek}</div>
        <div>{new Date(days[weekdayNumber]).getUTCDate().toString()}</div>
      </div>

      {/* Scrollable Tasks Area */}
      {currentTasks.length > 0 && (
        <div className={styles.tasksContainer}>
          {currentTasks.map((task) => (
            <div
              key={task._id}
              className={`${styles.task} ${task.completed ? styles.completedTask : ''}`}
            >
              <p className="text">{task.title}</p>
              <p className="text">{task.description}</p>
              <div className={styles.taskActions}>
                <button onClick={() => handleDeleteTask(task._id || '')}>
                  ×
                </button>
                {task.completed ? (
                  <button onClick={() => handleRevertTask(task._id || '')}>
                    Revert
                  </button>
                ) : (
                  <button onClick={() => handleCompleteTask(task._id || '')}>
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Creation Bottom Section */}
      <div className={styles.creationWrapper}>
        {!isActive ? (
          <button className={styles.initiateCreateBtn} onClick={handleIsActive}>
            + Add Task
          </button>
        ) : (
          <div className={styles.createTaskContainer}>
            <input
              value={title}
              onChange={handleTitleChange}
              type="text"
              placeholder="Task title..."
            />
            <input
              value={description}
              onChange={handleDescriptionChange}
              type="text"
              placeholder="Description (optional)"
            />
            <div className={styles.formActions}>
              <button className={styles.saveBtn} onClick={handleCreateTask}>
                Save
              </button>
              <button className={styles.cancelBtn} onClick={handleIsActive}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeekDay;
