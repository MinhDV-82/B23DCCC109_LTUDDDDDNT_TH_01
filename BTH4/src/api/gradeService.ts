import { request } from './client';

export const gradeService = {
  getAll: () => request('GET', '/grades?_expand=course'),
};

