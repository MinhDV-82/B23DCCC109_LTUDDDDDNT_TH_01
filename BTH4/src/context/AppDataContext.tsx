import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import { Student, Course, Assignment, Grade } from '../types';
import { CACHE_KEYS } from '../storage/keys';
import { getCache, setCache } from '../storage/cache';
import { enqueue } from '../storage/outbox';
import { assignmentService } from '../api/assignmentService';
import { studentService } from '../api/studentService';
import { courseService } from '../api/courseService';
import { gradeService } from '../api/gradeService';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

interface AppDataContextType {
  student: Student | null;
  courses: Course[];
  assignments: Assignment[];
  grades: Grade[];
  loading: boolean;
  refreshing: boolean;
  lastUpdated: string | null;
  refreshAll: () => Promise<void>;
  toggleAssignmentStatus: (id: number | string) => Promise<void>;
  addAssignment: (newAssignment: Omit<Assignment, 'id'>) => Promise<void>;
  updateStudent: (data: Partial<Student>) => Promise<void>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const { isOnline } = useNetworkStatus();

  const refreshAll = useCallback(async () => {
    const [cStudent, cCourses, cAssignments, cGrades] = await Promise.all([
      getCache<Student>(CACHE_KEYS.STUDENT),
      getCache<Course[]>(CACHE_KEYS.COURSES),
      getCache<Assignment[]>(CACHE_KEYS.ASSIGNMENTS),
      getCache<Grade[]>(CACHE_KEYS.GRADES),
    ]);

    if (cStudent) setStudent(cStudent.data);
    if (cCourses) setCourses(cCourses.data);
    if (cAssignments) setAssignments(cAssignments.data);
    if (cGrades) setGrades(cGrades.data);
    if (cAssignments) setLastUpdated(cAssignments.savedAt);

    if (cStudent || cCourses || cAssignments) {
      setLoading(false);
    }

    try {
      const [fStudent, fCourses, fAssignments, fGrades] = await Promise.all([
        studentService.getProfile(),
        courseService.getAll(),
        assignmentService.getAll(),
        gradeService.getAll(),
      ]);

      setStudent(fStudent);
      setCourses(fCourses);
      setAssignments(fAssignments);
      setGrades(fGrades);

      const nowIso = new Date().toISOString();
      setLastUpdated(nowIso);

      await Promise.all([
        setCache(CACHE_KEYS.STUDENT, fStudent),
        setCache(CACHE_KEYS.COURSES, fCourses),
        setCache(CACHE_KEYS.ASSIGNMENTS, fAssignments),
        setCache(CACHE_KEYS.GRADES, fGrades),
      ]);
    } catch {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const toggleAssignmentStatus = async (id: number | string) => {
    const target = assignments.find((a) => String(a.id) === String(id));
    if (!target) return;

    const oldStatus = target.status;
    const newStatus: 'todo' | 'done' = oldStatus === 'todo' ? 'done' : 'todo';
    const nowIso = new Date().toISOString();

    const updatedAssignments = assignments.map((a) =>
      String(a.id) === String(id)
        ? { ...a, status: newStatus, updatedAt: nowIso, pending: !isOnline }
        : a
    );
    setAssignments(updatedAssignments);
    await setCache(CACHE_KEYS.ASSIGNMENTS, updatedAssignments);

    if (isOnline) {
      try {
        await assignmentService.updateStatus(id, newStatus);
      } catch {
        Alert.alert('Lỗi', 'Không thể cập nhật trạng thái bài tập. Đang hoàn tác...');
        const rollback = assignments.map((a) =>
          String(a.id) === String(id) ? { ...a, status: oldStatus } : a
        );
        setAssignments(rollback);
        await setCache(CACHE_KEYS.ASSIGNMENTS, rollback);
      }
    } else {
      await enqueue({
        method: 'PATCH',
        url: `/assignments/${id}`,
        body: { status: newStatus, updatedAt: nowIso },
      });
    }
  };

  const addAssignment = async (newAssignmentData: Omit<Assignment, 'id'>) => {
    const nowIso = new Date().toISOString();
    if (isOnline) {
      try {
        const created = await assignmentService.create(newAssignmentData);
        const matchedCourse = courses.find((c) => String(c.id) === String(created.courseId));
        const itemWithCourse = { ...created, course: matchedCourse };

        const updated = [itemWithCourse, ...assignments];
        setAssignments(updated);
        await setCache(CACHE_KEYS.ASSIGNMENTS, updated);
      } catch (err: any) {
        Alert.alert('Lỗi', err.message || 'Không thể tạo bài tập.');
        throw err;
      }
    } else {
      const tempId = `temp_${Date.now()}`;
      const matchedCourse = courses.find((c) => String(c.id) === String(newAssignmentData.courseId));
      const tempItem: Assignment = {
        ...newAssignmentData,
        id: tempId,
        updatedAt: nowIso,
        pending: true,
        course: matchedCourse,
      };

      const updated = [tempItem, ...assignments];
      setAssignments(updated);
      await setCache(CACHE_KEYS.ASSIGNMENTS, updated);

      await enqueue({
        method: 'POST',
        url: '/assignments',
        body: {
          courseId: Number(newAssignmentData.courseId),
          title: newAssignmentData.title,
          description: newAssignmentData.description,
          dueDate: newAssignmentData.dueDate,
          status: newAssignmentData.status,
          updatedAt: nowIso,
        },
      });
    }
  };

  const updateStudent = async (data: Partial<Student>) => {
    if (!student) return;
    const nowIso = new Date().toISOString();
    const updated = { ...student, ...data, updatedAt: nowIso };
    setStudent(updated);
    await setCache(CACHE_KEYS.STUDENT, updated);

    if (isOnline) {
      try {
        await studentService.updateProfile(data);
      } catch (err: any) {
        Alert.alert('Lỗi', err.message || 'Không thể lưu thông tin.');
        throw err;
      }
    } else {
      await enqueue({
        method: 'PATCH',
        url: '/students/1',
        body: { ...data, updatedAt: nowIso },
      });
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        student,
        courses,
        assignments,
        grades,
        loading,
        refreshing,
        lastUpdated,
        refreshAll,
        toggleAssignmentStatus,
        addAssignment,
        updateStudent,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData phải được dùng bên trong AppDataProvider');
  }
  return context;
}

