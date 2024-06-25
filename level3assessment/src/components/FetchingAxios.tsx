import axios from "axios";
import { Key, useEffect, useState } from "react";

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const FetchingAxios = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<Key>("");
  const [editingText, setEditingText] = useState("");

  const fetchData = () => {
    axios
      .get<TodoItem[]>("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: TodoItem = {
        userId: 1,
        id: Math.floor(Math.random() * 10000),
        title: input,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditingText(title);
  };

  const stopEditing = () => {
    setEditingId("");
    setEditingText("");
  };

  const updateTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editingText } : todo
    );
    setTodos(updatedTodos);
    stopEditing();
  };

  return (
    <>
      <div className="myContainer">
        <div className="row">
          <div className="col-1"></div>
          <h1>Todo List</h1>
          <input
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="addButton btn btn-success"
            title="Add task to list"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        {error && <div>Error: {error}</div>}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              {editingId === todo.id ? (
                <input
                  type="text"
                  width={50}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onBlur={() => stopEditing()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo(todo.id);
                    } else if (e.key === "Escape") {
                      stopEditing();
                    }
                  }}
                />
              ) : (
                todo.title
              )}

              <button
                className="btn btn-primary mx-2"
                title="Edit Task"
                onClick={() => startEditing(todo.id, todo.title)}
              >
                Update
              </button>
              <button
                className="btn btn-danger mx-1"
                title="Delete Task"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FetchingAxios;
