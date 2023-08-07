import React from 'react';
import TaskList from './components/TaskList';

/**
 * Componente principal de la aplicación.
 * @returns {JSX.Element} - Elemento JSX que representa la aplicación.
 */
const App = () => {
  return (
    <div>
      {/* Componente que contiene la lista de tareas */}
      <TaskList />
    </div>
  );
};

export default App;