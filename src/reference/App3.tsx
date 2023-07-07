import { useState } from 'react';
import '../App.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo, getTodos } from '../api/todoApis';

import { ReactComponent as Delete } from './assets/delete.svg';
import { Box, Button, Flex, Input } from 'theme-ui';

/**
 * Uses react-query and Theme UI
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
      <Flex
        as="form"
        sx={{
          gap: 3,
        }}
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleOnClick();
        }}
      >
        <Input
          type="text"
          placeholder="Get groceries"
          onChange={handleOnChange}
          value={text}
        />
        <Button
          type="submit"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Add
        </Button>
      </Flex>
      <Box as="ul" aria-label="todos" sx={{ padding: 0, mt: 3 }}>
        {todos.map((todo) => (
          <Box
            as="li"
            key={todo.id}
            aria-label={todo.title}
            sx={{
              display: 'flex',
              listStyle: 'none',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
            }}
          >
            <div>{todo.title}</div>
            <button
              onClick={handleDelete(todo.id)}
              aria-label={`delete todo: ${todo.title}`}
            >
              <Delete />
            </button>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default App;
