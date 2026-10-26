import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MainTabParamList } from './types';
import { ROUTES } from './routes';

import { HomeScreen } from '../screens/tabs/HomeScreen';
import { CourseListScreen } from '../screens/tabs/CourseListScreen';
import { ScheduleScreen } from '../screens/tabs/ScheduleScreen';
import { AssignmentsScreen } from '../screens/tabs/AssignmentsScreen';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';
import { useAppData } from '../context/AppDataContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
  const { assignments } = useAppData();
  const pendingAssignmentCount = assignments.filter(
    (a) => a.status === 'todo'
  ).length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#B71C1C',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'help-outline';

          if (route.name === ROUTES.HOME_TAB) {
            iconName = 'home';
          } else if (route.name === ROUTES.COURSES_TAB) {
            iconName = 'menu-book';
          } else if (route.name === ROUTES.SCHEDULE_TAB) {
            iconName = 'calendar-today';
          } else if (route.name === ROUTES.ASSIGNMENTS_TAB) {
            iconName = 'assignment';
          } else if (route.name === ROUTES.PROFILE_TAB) {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_TAB}
        component={HomeScreen}
        options={{ tabBarLabel: 'Tổng quan' }}
      />
      <Tab.Screen
        name={ROUTES.COURSES_TAB}
        component={CourseListScreen}
        options={{ tabBarLabel: 'Môn học' }}
      />
      <Tab.Screen
        name={ROUTES.SCHEDULE_TAB}
        component={ScheduleScreen}
        options={{ tabBarLabel: 'Lịch học' }}
      />
      <Tab.Screen
        name={ROUTES.ASSIGNMENTS_TAB}
        component={AssignmentsScreen}
        options={{
          tabBarLabel: 'Bài tập',
          tabBarBadge:
            pendingAssignmentCount > 0 ? pendingAssignmentCount : undefined,
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE_TAB}
        component={ProfileScreen}
        options={{ tabBarLabel: 'Cá nhân' }}
      />
    </Tab.Navigator>
  );
}
