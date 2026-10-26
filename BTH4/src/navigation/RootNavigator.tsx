import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { ROUTES } from './routes';

import { TabNavigator } from './TabNavigator';
import { CourseDetailScreen } from '../screens/details/CourseDetailScreen';
import { ScheduleDetailScreen } from '../screens/details/ScheduleDetailScreen';
import { AssignmentDetailScreen } from '../screens/details/AssignmentDetailScreen';
import { AssignmentFormScreen } from '../screens/details/AssignmentFormScreen';
import { GradeDetailScreen } from '../screens/details/GradeDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#B71C1C',
        headerBackTitle: 'Quay lại',
        headerTitleStyle: { fontWeight: '700', color: '#0F172A' },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name={ROUTES.COURSE_DETAIL}
        component={CourseDetailScreen}
        options={{ title: 'Chi tiết môn học' }}
      />
      <Stack.Screen
        name={ROUTES.SCHEDULE_DETAILS}
        component={ScheduleDetailScreen}
        options={{ title: 'Chi tiết buổi học' }}
      />
      <Stack.Screen
        name={ROUTES.ASSIGNMENT_DETAILS}
        component={AssignmentDetailScreen}
        options={{ title: 'Chi tiết bài tập' }}
      />
      <Stack.Screen
        name={ROUTES.ASSIGNMENT_FORM}
        component={AssignmentFormScreen}
        options={{ title: 'Thêm bài tập mới' }}
      />
      <Stack.Screen
        name={ROUTES.GRADE_DETAILS}
        component={GradeDetailScreen}
        options={{ title: 'Kết quả học tập' }}
      />
    </Stack.Navigator>
  );
}

