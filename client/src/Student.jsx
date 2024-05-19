import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const response = await axios.post("http://localhost:5000/api/insert", {
      title: newTodo,
    });
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/delete/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/update/${id}`, {
      completed: !completed,
    });
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold mb-8">To-Do List</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo"
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>
        <ul className="list-none p-0">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white p-4 mb-2 rounded-md shadow-sm"
            >
              <span
                className={`flex-1 cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
                onClick={() => toggleComplete(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
