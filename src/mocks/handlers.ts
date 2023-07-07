/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { rest } from 'msw';
import { db } from './db';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const handlers = [
  rest.get('*/todos', (req, res, ctx) => {
    const todos: Todo[] = db.todo.getAll();
    return res(ctx.status(200), ctx.json(todos));
  }),

  rest.post('*/todos', async (req, res, ctx) => {
    const { title } = await req.json();
    const todo = db.todo.create({ title, completed: false });
    return res(ctx.status(201), ctx.json(todo));
  }),

  rest.delete('*/todos/:id', async (req, res, ctx) => {
    const { id } = req.params;
    db.todo.delete({
      where: {
        id: {
          equals: Number(id),
        },
      },
    });
    return res(ctx.status(200), ctx.json(null));
  }),
];
