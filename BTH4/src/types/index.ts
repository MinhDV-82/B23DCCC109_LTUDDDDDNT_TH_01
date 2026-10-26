export interface Student {
  id: number;
  studentCode: string;
  fullName: string;
  className: string;
  major: string;
  email: string;
  phone: string;
  updatedAt?: string;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  description: string;
  semester: string;
}

export interface Session {
  id: number;
  courseId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
  note?: string;
  course?: Course;
}

export interface Assignment {
  id: number | string;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'todo' | 'done';
  updatedAt: string;
  course?: Course;
  pending?: boolean;
}

export interface Grade {
  id: number;
  courseId: number;
  semester: string;
  attendance: number;
  midterm: number;
  final: number;
  total: number;
  letter: string;
  course?: Course;
}
