import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { initialAssignments } from '../../data/mocData';
import { Assignment } from '../../types';
import { assignmentsStyles as styles } from '../../styles/assignmentsStyles';
import { AssignmentCard, FilterTabs, FilterTabOption, EmptyState } from '../../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const STORAGE_KEY = '@assignments_data';
type FilterStatus = 'ALL' | 'PENDING' | 'DONE';

const FILTER_OPTIONS: FilterTabOption<FilterStatus>[] = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'PENDING', label: 'Chưa xong' },
  { key: 'DONE', label: 'Đã xong' },
];

export function AssignmentsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [filter, setFilter] = useState<FilterStatus>('ALL');

  // Đọc dữ liệu mới nhất từ AsyncStorage mỗi khi vào màn hình
  useFocusEffect(
    useCallback(() => {
      async function loadAssignments() {
        try {
          const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
          if (jsonValue !== null) {
            setAssignments(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error('Lỗi khi tải bài tập từ storage:', e);
        }
      }
      loadAssignments();
    }, []),
  );

  // Cập nhật trạng thái bài tập và lưu vào AsyncStorage
  const toggleAssignmentStatus = async (id: string) => {
    const updated = assignments.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
    );
    setAssignments(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Lỗi khi lưu bài tập:', e);
    }
  };

  // Lọc bài tập theo trạng thái
  const filteredAssignments = assignments.filter(item => {
    if (filter === 'PENDING') return !item.isCompleted;
    if (filter === 'DONE') return item.isCompleted;
    return true;
  });

  const renderAssignmentItem = ({ item }: { item: Assignment }) => (
    <AssignmentCard
      assignment={item}
      variant="full"
      onPress={() => navigation.navigate('AssignmentDetails', { assignment: item })}
      onToggleStatus={toggleAssignmentStatus}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* THANH LỌC TRẠNG THÁI KIỂU SEGMENTED CONTROL */}
      <FilterTabs
        options={FILTER_OPTIONS}
        selected={filter}
        onSelect={setFilter}
      />

      {/* DANH SÁCH BÀI TẬP BẰNG FLATLIST */}
      <FlatList
        data={filteredAssignments}
        keyExtractor={item => item.id}
        renderItem={renderAssignmentItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="Không có bài tập nào"
            subtitle="Tất cả các bài tập đã được lọc hoặc hoàn thành."
          />
        }
      />
    </SafeAreaView>
  );
}

