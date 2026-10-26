import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { useAppData } from '../../context/AppDataContext';
import { Assignment } from '../../types';
import { isOverdue } from '../../utils/date';
import { AssignmentCard, EmptyState } from '../../components';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FilterType = 'ALL' | 'TODO' | 'DONE' | 'OVERDUE';

const FILTER_TABS: { key: FilterType; label: string }[] = [
  { key: 'ALL', label: 'Tất cả' },
  { key: 'TODO', label: 'Chưa xong' },
  { key: 'DONE', label: 'Đã xong' },
  { key: 'OVERDUE', label: 'Quá hạn' },
];

export function AssignmentsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { assignments, loading, refreshing, refreshAll, toggleAssignmentStatus, lastUpdated } =
    useAppData();
  const [currentFilter, setCurrentFilter] = useState<FilterType>('ALL');

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const isDone = item.status === 'done';
      const overdue = !isDone && isOverdue(item.dueDate);

      if (currentFilter === 'TODO') return !isDone && !overdue;
      if (currentFilter === 'DONE') return isDone;
      if (currentFilter === 'OVERDUE') return overdue;
      return true;
    });
  }, [assignments, currentFilter]);

  if (loading && assignments.length === 0) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải danh sách bài tập..." />
      </ScreenContainer>
    );
  }

  const renderItem = ({ item }: { item: Assignment }) => (
    <AssignmentCard
      assignment={item}
      variant="full"
      onPress={() =>
        navigation.navigate(ROUTES.ASSIGNMENT_DETAILS, { id: item.id })
      }
      onToggleStatus={() => toggleAssignmentStatus(item.id)}
    />
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.title}>Quản lý bài tập</Text>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(ROUTES.ASSIGNMENT_FORM)}
            accessibilityLabel="Thêm bài tập"
          >
            <Text style={styles.addButtonText}>+ Thêm bài</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          {FILTER_TABS.map((tab) => {
            const isSelected = currentFilter === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.filterTab,
                  isSelected && styles.filterTabActive,
                ]}
                onPress={() => setCurrentFilter(tab.key)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    isSelected && styles.filterTabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <LastUpdatedText timestamp={lastUpdated} />

        <FlatList
          data={filteredAssignments}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={refreshAll}
          ListEmptyComponent={
            <EmptyState
              title="Không có bài tập nào"
              description="Không tìm thấy bài tập phù hợp với bộ lọc hiện tại."
            />
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  addButtonText: {
    ...typography.bodyBold,
    color: colors.white,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterTabText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  filterTabTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
});
