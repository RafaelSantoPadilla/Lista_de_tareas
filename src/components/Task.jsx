import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente para representar una tarea individual.
 * - description: Descripción de la tarea.
 * - completed: Booleano que indica si la tarea está completada.
 * - onToggleCompleted: Función para cambiar el estado de completado de la tarea.
 * - onDelete: Función para eliminar la tarea.
 */
const Task = ({ description, completed, onToggleCompleted, onDelete }) => {
  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
      <p>{description}</p>
      {completed && <FontAwesomeIcon icon={faCheck} className="checkmark-icon" />}
      {!completed && (
        <button onClick={onToggleCompleted} className="complete-button">
          Completar
        </button>
      )}
      <button onClick={onDelete} className="delete-button">
        Eliminar
      </button>
    </div>
  );
};

export default Task;
