import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import type { Student } from '../types/student';
import { StudentListScreen } from '../screens/StudentListScreen';
import { StudentDetailScreen } from '../screens/StudentDetailScreen';
import { StudentFormScreen } from '../screens/StudentFormScreen';
import type { RootStackParamList } from './types';
import { colors } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
type Props = {
  students: Student[];
  onAdd: (student: Student) => void;
  onUpdate: (student: Student) => void;
  onDelete: (studentId: string) => void;
};

export function AppNavigator({ students, onAdd, onUpdate, onDelete }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.ink,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="List" options={{ title: 'Quản lí sinh viên' }}>
        {props => <StudentListScreen {...props} students={students} />}
      </Stack.Screen>
      <Stack.Screen name="Detail" options={{ title: 'Thông tin sinh viên' }}>
        {props => (
          <StudentDetailScreen
            {...props}
            students={students}
            onDelete={onDelete}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Add" options={{ title: 'Thêm sinh viên' }}>
        {props => (
          <StudentFormScreen
            navigation={props.navigation}
            existingIds={students.map(item => item.id)}
            onSubmit={onAdd}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Edit" options={{ title: 'Chỉnh sửa sinh viên' }}>
        {props => (
          <StudentFormScreen
            navigation={props.navigation}
            student={students.find(
              item => item.id === props.route.params.studentId,
            )}
            onSubmit={onUpdate}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 18, fontWeight: '700' },
});
