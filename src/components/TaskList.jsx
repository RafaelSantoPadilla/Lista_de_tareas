import React, { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';
import '../assets/css/TaskList.css';

// Función para obtener las tareas iniciales desde la API
const fetchInitialTasks = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return response.data;
  } catch (error) {
    console.error('Error fetching initial tasks:', error);
    return [];
  }
};

const TaskList = () => {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);

  // Estado para manejar la descripción de la nueva tarea
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Estado para el filtro de tareas completadas
  const [filterCompleted, setFilterCompleted] = useState(false);

  // Función para marcar una tarea como completada o no completada
  const handleToggleCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Función para agregar una nueva tarea
  const handleAddTask = () => {
    if (newTaskDescription.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: newTaskDescription,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskDescription('');
  };

  // Función para eliminar una tarea de la lista
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Función para cambiar el filtro de tareas completadas
  const handleFilterChange = () => {
    setFilterCompleted(!filterCompleted);
  };

  // Carga las tareas iniciales desde la API al montar el componente
  useEffect(() => {
    const fetchInitialTasksAndSetState = async () => {
      const initialTasks = await fetchInitialTasks();
      setTasks(initialTasks);
    };
    fetchInitialTasksAndSetState();
  }, []);

  // Guarda la lista de tareas en el LocalStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filtramos las tareas según el valor del filtro
  const filteredTasks = filterCompleted ? tasks.filter((task) => task.completed) : tasks;

  return (
    <div className="task-list">
      <h1>Lista de Tareas</h1>
      <div className="filter">
        <label>
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={handleFilterChange}
          />
          Mostrar tareas completadas
        </label>
      </div>
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          description={task.title}
          completed={task.completed}
          onToggleCompleted={() => handleToggleCompleted(task.id)}
          onDelete={() => handleDeleteTask(task.id)}
        />
      ))}
      <div className="add-task-form">
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button onClick={handleAddTask}>Agregar Tarea</button>
      </div>
    </div>
  );
};

export default TaskList;