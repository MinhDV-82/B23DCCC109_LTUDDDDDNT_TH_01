import { request } from './client';

export const studentService = {
  getProfile: () => request('GET', '/students/1'),
  updateProfile: (data: any) =>
    request('PATCH', '/students/1', {
      ...data,
      updatedAt: new Date().toISOString(),
    }),
};

