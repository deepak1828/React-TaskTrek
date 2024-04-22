import React, {useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm/TaskForm';
import TaskColumn from './components/TaskColumn/TaskColumn';

import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";

const oldTasks = localStorage.getItem("tasks");

const taskColumn = [
  {
    title: 'To Do',
    icon: todoIcon,
    status: 'todo'
  },
  {
    title: 'Doing',
    icon: doingIcon,
    status: 'doing'
  },
  {
    title: 'Done',
    icon: doneIcon,
    status: 'done'
  }
];

function App() {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks])

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
  }
  return (
    <div className='app'>
      <TaskForm setTasks={setTasks} />
      <main className='app_main'>
        {taskColumn.map((column, index) => (
            <TaskColumn key={index} title={column.title} icon={column.icon} tasks={tasks} status={column.status} handleDelete={handleDelete}/>
          ))}
      </main>
    </div>
  );
}

export default App;
