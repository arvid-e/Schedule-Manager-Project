import React, { useState, type ChangeEvent } from 'react';


function ToDoList() {

    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function deleteTask(index: number) {
        const updatedTasks = tasks.filter((element, i) => i !== index);
        setTasks(updatedTasks);
    }

    function addTask() {
        if (newTask.trim() !== '') {
            setTasks( t => [...t, newTask]);
            setNewTask('');
        }
        
    }

    return(
    <div className='to-do-list'>

        <h1>List</h1>

        <div>
            <input
                type='text'
                placeholder='Enter a task...'
                value={newTask}
                onChange={handleInputChange}
            />
            <button
                className='add-task-button'
                onClick={addTask}>
                add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) => 
                <li key={index}>
                    <span className='text'>{task}</span>
                    <button
                        className='delete-task-button'
                        onClick={() => deleteTask(index)}>
                        Delete
                        </button>
                </li>
            )}
        </ol>
    </div>)
}

export default ToDoList;