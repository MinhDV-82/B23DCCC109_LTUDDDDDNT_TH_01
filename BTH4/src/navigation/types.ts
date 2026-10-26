import { ROUTES } from './routes';

export type MainTabParamList = {
  [ROUTES.HOME_TAB]: undefined;
  [ROUTES.COURSES_TAB]: undefined;
  [ROUTES.SCHEDULE_TAB]: undefined;
  [ROUTES.ASSIGNMENTS_TAB]: undefined;
  [ROUTES.PROFILE_TAB]: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  [ROUTES.COURSE_DETAIL]: { id: number | string };
  [ROUTES.SCHEDULE_DETAILS]: { id: number | string };
  [ROUTES.ASSIGNMENT_DETAILS]: { id: number | string };
  [ROUTES.ASSIGNMENT_FORM]: undefined;
  [ROUTES.GRADE_DETAILS]: { id: number | string };
  [ROUTES.GRADE_LIST]: undefined;
  [ROUTES.EDIT_PROFILE]: undefined;
};
