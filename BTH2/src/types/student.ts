export type Student = {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  className: string;
  faculty: string;
  gpa: string;
};

export type StudentForm = Omit<Student, 'id'>;
