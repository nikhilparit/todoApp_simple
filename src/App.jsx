import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  function addTodo() {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask("");
    }
  }

  useEffect(() => {
  }, [todos])

  function removeTodo(index) {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  }
  function startEdit(index) {
    setEditIndex(index);
    setEditTask(todos[index]);
  }

  function saveEdit() {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = editTask;
    setTodos(updatedTodos);
    setEditIndex(null);
  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Todo App</h1>
        <div className="card p-4 shadow">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={addTodo}>
            Add Task
          </button>
          <ul className="list-group mt-3">
            {todos.map((todo, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{todo}</span>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(index)}>✏️</button>
                  <button className="btn btn-danger btn-sm text-white" onClick={() => removeTodo(index)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editIndex !== null && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Todo</h5>
                  <button type="button" className="btn-close" onClick={() => setEditIndex(null)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={saveEdit}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditIndex(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App
