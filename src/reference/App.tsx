import { useState } from 'react';
import '../App.css';

/**
 * Simple todo app not hooked up to server data
 */
function App() {
  // handle input state
  const [text, setText] = useState('');
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // handle todos
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Get groceries',
      completed: false,
    },
  ]);

  // handle adding todos
  const handleOnClick = () => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random(),
          title: text,
          completed: false,
        },
      ];
    });
    setText('');
  };

  // handle deleting todos
  const handleDelete = (id: number) => () => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Get groceries"
        onChange={handleOnChange}
        value={text}
      />
      <button onClick={handleOnClick}>Add</button>
      <ul aria-label="todos">
        {todos.map((todo) => (
          <li key={todo.id} aria-label={todo.title}>
            <div>{todo.title}</div>
            <button onClick={handleDelete(todo.id)}>
              delete todo: {todo.title}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
