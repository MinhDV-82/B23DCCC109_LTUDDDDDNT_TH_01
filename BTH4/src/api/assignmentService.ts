import { request } from './client';

export const assignmentService = {
  getAll: () => request('GET', '/assignments?_expand=course&_sort=dueDate'),
  getById: (id: string | number) => request('GET', `/assignments/${id}?_expand=course`),
  create: (data: any) =>
    request('POST', '/assignments', {
      ...data,
      updatedAt: new Date().toISOString(),
    }),
  updateStatus: (id: string | number, status: 'todo' | 'done') =>
    request('PATCH', `/assignments/${id}`, {
      status,
      updatedAt: new Date().toISOString(),
    }),
};

