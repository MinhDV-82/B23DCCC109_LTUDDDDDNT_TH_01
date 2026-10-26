import { request } from './client';

export const sessionService = {
  getAll: () => request('GET', '/sessions?_expand=course'),
};
