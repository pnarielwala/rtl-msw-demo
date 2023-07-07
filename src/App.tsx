import { useState } from 'react';
import './App.css';
import { ReactComponent as Delete } from './assets/delete.svg';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getTodos, createTodo, deleteTodo } from './api/todoApis';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

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
        placeholder="Add a new todo"
        onChange={handleOnChange}
        value={text}
      />
      <button onClick={handleOnClick}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} aria-label={todo.title}>
            {todo.title}
            <button
              onClick={handleDelete(todo.id)}
              aria-label={`Delete todo: ${todo.title}`}
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
