import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Import Tab Navigator và 4 màn hình chi tiết
import { TabNavigator } from './TabNavigator';
import { SubjectDetailScreen } from '../screens/details/SubjectDetailScreen';
import { ScheduleDetailScreen } from '../screens/details/ScheduleDetailScreen';
import { AssignmentDetailScreen } from '../screens/details/AssignmentDetailScreen';
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

      {/* 2. Các màn hình chi tiết (mở đè lên trên khi cần) */}
      <Stack.Screen
        name="SubjectDetails"
        component={SubjectDetailScreen}
        options={{ title: 'Chi tiết môn học' }}
      />
      <Stack.Screen
        name="ScheduleDetails"
        component={ScheduleDetailScreen}
        options={{ title: 'Chi tiết buổi học' }}
      />
      <Stack.Screen
        name="AssignmentDetails"
        component={AssignmentDetailScreen}
        options={{ title: 'Chi tiết bài tập' }}
      />
      <Stack.Screen
        name="GradeDetails"
        component={GradeDetailScreen}
        options={{ title: 'Kết quả học tập' }}
      />
    </Stack.Navigator>
  );
}