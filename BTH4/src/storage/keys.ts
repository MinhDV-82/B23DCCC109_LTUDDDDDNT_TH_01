export const CACHE_KEYS = {
  STUDENT: 'cache:student',
  COURSES: 'cache:courses',
  SESSIONS: 'cache:sessions',
  ASSIGNMENTS: 'cache:assignments',
  GRADES: 'cache:grades',
  COURSE_DETAIL: (id: string | number) => `cache:course:${id}`,
  ASSIGNMENT_DETAIL: (id: string | number) => `cache:assignment:${id}`,
} as const;

export const OUTBOX_KEY = 'outbox:queue';

