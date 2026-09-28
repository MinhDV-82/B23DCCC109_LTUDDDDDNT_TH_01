import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentCard } from '../components/StudentCard';
import type { Student } from '../types/student';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../styles/theme';
import { listStyles } from '../styles/listStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'List'> & {
  students: Student[];
};

export function StudentListScreen({ navigation, students }: Props) {
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const filteredStudents = students.filter(
    student =>
      student.id.toLowerCase().includes(query) ||
      student.name.toLowerCase().includes(query),
  );

  return (
    <SafeAreaView edges={['bottom']} style={listStyles.screen}>
      <View style={listStyles.listHeader}>
        <View>
          <Text style={listStyles.pageTitle}>Danh sách sinh viên</Text>
        </View>
        <Pressable
          accessibilityLabel="Thêm sinh viên"
          onPress={() => navigation.navigate('Add')}
          style={listStyles.addIconButton}
        >
          <Text style={listStyles.addIcon}>+</Text>
        </Pressable>
      </View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm theo mã hoặc họ tên..."
        placeholderTextColor={colors.muted}
        style={listStyles.searchInput}
      />
      <Text style={listStyles.resultCount}>
        {filteredStudents.length} sinh viên
      </Text>
      <FlatList
        data={filteredStudents}
        keyExtractor={student => student.id}
        contentContainerStyle={listStyles.listContent}
        renderItem={({ item }) => (
          <StudentCard
            student={item}
            onPress={() =>
              navigation.navigate('Detail', { studentId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={listStyles.emptyText}>
            Không tìm thấy sinh viên phù hợp.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
