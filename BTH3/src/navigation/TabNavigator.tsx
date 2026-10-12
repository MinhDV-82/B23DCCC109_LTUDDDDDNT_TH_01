import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MainTabParamList } from './types';

import { HomeScreen } from '../screens/tabs/HomeScreen';
import { SubjectsScreen } from '../screens/tabs/SubjectsScreen';
import { ScheduleScreen } from '../screens/tabs/ScheduleScreen';
import { AssignmentsScreen } from '../screens/tabs/AssignmentsScreen';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
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

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'SubjectsTab') {
            iconName = 'menu-book';
          } else if (route.name === 'ScheduleTab') {
            iconName = 'calendar-today';
          } else if (route.name === 'AssignmentsTab') {
            iconName = 'assignment';
          } else if (route.name === 'ProfileTab') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Tổng quan' }}
      />
      <Tab.Screen
        name="SubjectsTab"
        component={SubjectsScreen}
        options={{ tabBarLabel: 'Môn học' }}
      />
      <Tab.Screen
        name="ScheduleTab"
        component={ScheduleScreen}
        options={{ tabBarLabel: 'Lịch học' }}
      />
      <Tab.Screen
        name="AssignmentsTab"
        component={AssignmentsScreen}
        options={{ tabBarLabel: 'Bài tập' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Cá nhân' }}
      />
    </Tab.Navigator>
  );
}
