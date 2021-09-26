import React from "react";

const Task = ({ task, toggleComplete, handleDelete }) => {
  return (
    <div className="task">
      <p
        style={{ textDecoration: task.completed && "line-through" }}
        onClick={() => toggleComplete(task)}
      >
        {task.title}
      </p>

      <button onClick={() => handleDelete(task.id)}>X</button>
    </div>
  );
};

export default Task;
