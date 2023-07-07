type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error('Something went wrong');
  return response.clone().json();
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Something went wrong');
  return response.clone().json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) throw new Error('Something went wrong');
  return response.clone().json();
};
