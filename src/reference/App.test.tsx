import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import App2 from './App2';
import App3 from './App3';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test.skip('v1 add new todo, display it in the list, then delete it', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Get groceries');
  const button = screen.getByRole('button', { name: 'Add' });

  await userEvent.type(input, 'Get milk');
  await userEvent.click(button);

  expect(screen.getByRole('listitem', { name: /get milk/i })).toBeDefined();

  await userEvent.click(
    screen.getByRole('button', { name: /delete todo: get milk/i }),
  );

  await waitFor(() => {
    expect(screen.queryByRole('listitem', { name: /get milk/i })).toBeNull();
  });
});

test.skip('v2 add new todo, display it in the list, then delete it', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App2 />
    </QueryClientProvider>,
  );

  const input = screen.getByPlaceholderText('Get groceries');
  const button = screen.getByRole('button', { name: 'Add' });

  await userEvent.type(input, 'Get milk');
  await userEvent.click(button);

  expect(screen.getByRole('listitem', { name: /get milk/i })).toBeDefined();

  await userEvent.click(
    screen.getByRole('button', { name: /delete todo: get milk/i }),
  );

  await waitFor(() => {
    expect(screen.queryByRole('listitem', { name: /get milk/i })).toBeNull();
  });
});

test.skip('v3 add new todo, display it in the list, then delete it', async () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <App3 />
    </QueryClientProvider>,
  );

  const input = screen.getByPlaceholderText('Get groceries');
  const button = screen.getByRole('button', { name: 'Add' });

  await userEvent.type(input, 'Get milk');
  await userEvent.click(button);

  expect(screen.getByRole('listitem', { name: /get milk/i })).toBeDefined();

  await userEvent.click(
    screen.getByRole('button', { name: /delete todo: get milk/i }),
  );

  await waitFor(() => {
    expect(screen.queryByRole('listitem', { name: /get milk/i })).toBeNull();
  });
});
