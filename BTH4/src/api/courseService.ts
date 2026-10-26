import { request } from './client';

export const courseService = {
  getAll: () => request('GET', '/courses'),
  getById: (id: string | number) => request('GET', `/courses/${id}`),
};

