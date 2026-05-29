import { useEffect, useState } from 'react';
import type { Task } from '../../interfaces/task';

import styles from './Week.module.css';

interface WeekProps {
  days: Date[];
  tasks: Task[];
}

interface SortedTasks {
  monday: Task[];
  tuesday: Task[];
  wednesday: Task[];
  thursday: Task[];
  friday: Task[];
  saturday: Task[];
  sunday: Task[];
}

function sortTasks(tasks: Task[], week: Date[]): SortedTasks {
  const sunday = 0;
  const monday = 1;
  const tuesday = 2;
  const wednesday = 3;
  const thursday = 4;
  const friday = 5;
  const saturday = 6;

  const sortedTasks: SortedTasks = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
  console.log('Checking if sorting is possible...');

  if (tasks != null && tasks.length > 0 && week != null && week.length > 0) {
    console.log('Sorting dates...');

    for (const task of tasks) {
      for (const day of week) {
        const taskDate = new Date(task.date);
        const weekDate = new Date(day);
        const taskDateTrimmed = `${taskDate.getUTCFullYear()}-${taskDate.getUTCMonth()}-${taskDate.getUTCDate()}`;
        const weekDateTrimmed = `${weekDate.getUTCFullYear()}-${weekDate.getUTCMonth()}-${weekDate.getUTCDate()}`;

        if (taskDateTrimmed === weekDateTrimmed) {
          console.log('FOUND MATCHING DAY');
          const dayOfTask = taskDate.getUTCDay();

          if (dayOfTask === monday) {
            sortedTasks.monday.push(task);
          } else if (dayOfTask === tuesday) {
            sortedTasks.tuesday.push(task);
          } else if (dayOfTask === wednesday) {
            sortedTasks.wednesday.push(task);
          } else if (dayOfTask === thursday) {
            sortedTasks.thursday.push(task);
          } else if (dayOfTask === friday) {
            sortedTasks.friday.push(task);
          } else if (dayOfTask === saturday) {
            sortedTasks.saturday.push(task);
          } else if (dayOfTask === sunday) {
            sortedTasks.sunday.push(task);
          }
        }
      }
    }
  }
  console.log(sortedTasks);

  return sortedTasks;
}

function Week({ tasks, days }: WeekProps) {
  const [loading, setLoading] = useState(false);
  const [mondayTasks, setMondayTasks] = useState<Task[]>([]);
  const [tuesdayTasks, setTuesdayTasks] = useState<Task[]>([]);
  const [wednesdayTasks, setWednesdayTasks] = useState<Task[]>([]);
  const [thursdayTasks, setThursdayTasks] = useState<Task[]>([]);
  const [fridayTasks, setFridayTasks] = useState<Task[]>([]);
  const [saturdayTasks, setSaturdayTasks] = useState<Task[]>([]);
  const [sundayTasks, setSundayTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getWeekData = async () => {
      setLoading(true);

      const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
        sortTasks(tasks, days);

      setMondayTasks(monday);
      setTuesdayTasks(tuesday);
      setWednesdayTasks(wednesday);
      setThursdayTasks(thursday);
      setFridayTasks(friday);
      setSaturdayTasks(saturday);
      setSundayTasks(sunday);

      setLoading(false);
    };
    getWeekData();
  }, [tasks, days]);

  if (loading) return <div>Searching database...</div>;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.week}>
          <div className={styles.monday}>
            <div>Monday</div>
            <div>{new Date(days[0]).getUTCDate().toString()}</div>
            <ul className={styles.mondayTasks}>
              {mondayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.tueday}>
            <div>Tuesday</div>
            <div>{new Date(days[1]).getUTCDate().toString()}</div>
            <ul className={styles.tuesdayTasks}>
              {tuesdayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.wednesday}>
            <div>Wednesday</div>
            <div>{new Date(days[2]).getUTCDate().toString()}</div>
            <ul className={styles.wednesdayTasks}>
              {wednesdayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.thursday}>
            <div>Thursday</div>
            <div>{new Date(days[3]).getUTCDate().toString()}</div>
            <ul className={styles.thursdayTasks}>
              {thursdayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.friday}>
            <div>Friday</div>
            <div>{new Date(days[4]).getUTCDate().toString()}</div>
            <ul className={styles.fridayTasks}>
              {fridayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.saturday}>
            <div>Saturday</div>
            <div>{new Date(days[5]).getUTCDate().toString()}</div>
            <ul className={styles.saturdayTasks}>
              {saturdayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sunday}>
            <div>Sunday</div>
            <div>{new Date(days[6]).getUTCDate().toString()}</div>
            <ul className={styles.sundayTasks}>
              {sundayTasks.map((task, index) => (
                <li key={index} className={styles.task}>
                  <p className="text">{task.title}</p>
                  <p className="text">{task.description}</p>

                  <button className="delete-task-button">Complete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.weekBacklog}>
          <div>Week Backlog</div>
          <ul className={styles.taskList}>
            {tasks.map((task, index) => (
              <li key={index} className={styles.task}>
                <p className="text">{task.title}</p>
                <p className="text">{task.description}</p>
                <p className="">{task.date.toString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Week;
