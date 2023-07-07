import userEvent from '@testing-library/user-event';
import App from './App';
import { server } from './mocks/server';
import { rest } from 'msw';

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('add new todo, display it in the list, then delete it', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>,
  );

  expect(screen.getByRole('heading', { name: /todo app/i })).toBeDefined();

  const input = screen.getByPlaceholderText(/add a new todo/i);
  await userEvent.type(input, 'new todo');

  const button = screen.getByRole('button', { name: /add/i });
  userEvent.click(button);

  expect(
    await screen.findByRole('listitem', { name: /new todo/i }),
  ).toBeDefined();

  const deleteButton = screen.getByRole('button', {
    name: /delete todo: new todo/i,
  });
  userEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByRole('listitem', { name: /new todo/i })).toBeNull();
  });
});

test('load existing todos', async () => {
  server.use(
    rest.get('*/todos', (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'Todo from server',
            completed: false,
          },
        ]),
      );
    }),
  );
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>,
  );

  expect(screen.getByRole('heading', { name: /todo app/i })).toBeDefined();

  expect(
    await screen.findByRole('listitem', { name: /todo from server/i }),
  ).toBeDefined();
});
