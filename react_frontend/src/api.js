const BASE = 'http://127.0.0.1:8000/api';

export const api = {
  login: (data) =>
    fetch(`${BASE}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  getTodos: () => fetch(`${BASE}/todos/`),

  addTodo: (data) =>
    fetch(`${BASE}/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  updateTodo: (id, data) =>
    fetch(`${BASE}/todos/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  deleteTodo: (id) =>
    fetch(`${BASE}/todos/${id}/`, { method: 'DELETE' }),
};