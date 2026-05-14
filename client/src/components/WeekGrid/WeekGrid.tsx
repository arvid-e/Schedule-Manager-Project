import { useEffect, useState } from 'react';
import { getTasks } from '../../services/task-service';

function WeekGrid({ userId }) {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const taskData = await getTasks(userId);
      setTasks(taskData);
    })();
  });

  

  return <></>;
}
