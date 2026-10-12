export interface Student {
  id: string;
  name: string; 
  class: string; 
  major: string; 
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface Subject {
  id: string; 
  name: string; 
  credits: number; 
  lecturer: string; 
  room: string; 
  description: string;
}

export interface ScheduleItem {
  id: string;
  subjectId: string;
  subjectName: string;
  dayOfWeek: string; 
  time: string;
  room: string;
  lecturer: string;
  lessonContent?: string;
}

export interface Assignment {
  id: string;
  subjectId: string;
  subjectName: string;
  title: string;
  dueDate: string;
  isCompleted: boolean;
  description: string;
}

export interface GradeItem {
  subjectId: string;
  subjectName: string;
  credits: number;
  attendanceScore: number;
  midtermScore: number;
  finalScore: number;
  averageScore: number;
  letterGrade: string;
}

