// src/mocks/db.js
import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  todo: {
    id: primaryKey(() => Math.random() * 10000),
    title: String,
    completed: Boolean,
  },
});
