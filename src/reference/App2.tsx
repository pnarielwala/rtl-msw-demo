import { useState } from 'react';
import '../App.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodos } from '../api/todoApis';

import { ReactComponent as Delete } from './assets/delete.svg';

/**
 * Uses react-query to fetch data and mutate data
 */
function App() {
  const queryClient = useQueryClient();

  // handle input state
  const [text, setText] = useState('');
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // handle todos
  const { data } = useQuery(['todos'], getTodos);
  const todos = data || [];

  // handle adding todos
  const { mutate: addTodo } = useMutation(createTodo, {
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleOnClick = () => {
    addTodo(text);
  };

  // handle deleting todos
  const { mutate: removeTodo } = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const handleDelete = (id: number) => () => {
    removeTodo(id);
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
            <button
              onClick={handleDelete(todo.id)}
              aria-label={`delete todo: ${todo.title}`}
            >
              <Delete />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
