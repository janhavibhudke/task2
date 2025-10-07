import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState("");        // Current input
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [filter, setFilter] = useState("All"); // Filter: All / Active / Completed

  // Persist tasks in localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAdd = () => {
    if (task.trim() === "") return; // Validation
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  // Filter tasks
  const filteredTasks = tasks.filter(t => {
    if (filter === "All") return true;
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1 className="title">Smart To-Do App</h1>

      {/* Input */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Filters */}
      <div className="filters">
        {["All", "Active", "Completed"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="task-list">
        {filteredTasks.map(t => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />
              <span>{t.text}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(t.id)}>✕</button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="footer">
        {tasks.filter(t => !t.completed).length} items left
      </footer>
    </div>
  );
}

export default App;
