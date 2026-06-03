import { useState } from 'react';
import { createTask } from '../../services/task-service';
import styles from './CreateTask.module.css';

interface CreateTaskProps {
  date: Date;
}

function CreateTask({ date }: CreateTaskProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateTask = async () => {
    const task = {
      title: title,
      description: description,
      date: date,
    };
    await createTask(task);
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
      <button onClick={handleIsActive}>Create</button>

      {isActive ? (
        <div className={styles.createTaskContainer}>
          <input value={title} onChange={handleTitleChange} type="text"></input>
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
    </>
  );
}

export default CreateTask;
