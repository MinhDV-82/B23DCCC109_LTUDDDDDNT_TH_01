import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/RootNavigator';
import { SyncProvider } from './context/SyncContext';
import { AppDataProvider } from './context/AppDataContext';

export default function App() {
  return (
   <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SyncProvider>
        <AppDataProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AppDataProvider>
      </SyncProvider>
    </SafeAreaProvider>
  );
}