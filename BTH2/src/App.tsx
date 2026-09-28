import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initialStudents } from './data/students';
import { AppNavigator } from './navigation/AppNavigator';
import type { Student } from './types/student';

export default function App() {
  const [students, setStudents] = useState(initialStudents);

  function addStudent(student: Student) {
    setStudents(current => [...current, student]);
  }

  function updateStudent(updatedStudent: Student) {
    setStudents(current =>
      current.map(student =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );
  }

  function deleteStudent(studentId: string) {
    setStudents(current => current.filter(student => student.id !== studentId));
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <AppNavigator
          students={students}
          onAdd={addStudent}
          onUpdate={updateStudent}
          onDelete={deleteStudent}
        />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
