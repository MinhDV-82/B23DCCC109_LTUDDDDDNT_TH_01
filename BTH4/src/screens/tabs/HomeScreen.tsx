import React from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { useAppData } from '../../context/AppDataContext';
import { useSync } from '../../context/SyncContext';
import { StudentCard, CourseCard, AssignmentCard, EmptyState } from '../../components';
import ScreenContainer from '../../components/common/ScreenContainer';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import LoadingView from '../../components/common/LoadingView';
import { daysLeft } from '../../utils/date';
import { homeStyles as styles } from '../../styles/homeStyles';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { student, courses, assignments, loading, refreshing, refreshAll, lastUpdated } =
    useAppData();
  const { pendingCount, syncNow, isOnline } = useSync();

  if (loading && !student && courses.length === 0) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải dữ liệu tổng quan..." />
      </ScreenContainer>
    );
  }

  const dueIn7Days = assignments.filter((item) => {
    if (item.status === 'done') return false;
    const days = daysLeft(item.dueDate);
    return days >= 0 && days <= 7;
  });

  return (
    <ScreenContainer
      scroll
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshAll}
          colors={[colors.primary]}
        />
      }
    >
      <View style={styles.content}>
        {pendingCount > 0 && (
          <TouchableOpacity
            style={localStyles.syncAlert}
            onPress={isOnline ? syncNow : undefined}
            activeOpacity={0.8}
          >
            <Text style={localStyles.syncAlertText}>
              Có {pendingCount} thay đổi chưa đồng bộ {isOnline ? '- Bấm để đồng bộ' : '- Chờ kết nối'}
            </Text>
          </TouchableOpacity>
        )}

        {student && <StudentCard student={student} />}

        <LastUpdatedText timestamp={lastUpdated} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bài tập đến hạn (7 ngày tới)</Text>
          <Text style={styles.badgeCount}>{dueIn7Days.length} bài</Text>
        </View>

        {dueIn7Days.length === 0 ? (
          <EmptyState title="Không có bài tập nào sắp đến hạn trong 7 ngày." />
        ) : (
          dueIn7Days.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              variant="compact"
              onPress={() =>
                navigation.navigate(ROUTES.ASSIGNMENT_DETAILS, {
                  id: assignment.id,
                })
              }
            />
          ))
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học đang học</Text>
          <Text style={styles.badgeCount}>{courses.length} môn</Text>
        </View>

        {courses.length === 0 ? (
          <EmptyState title="Chưa có môn học nào." />
        ) : (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              variant="compact"
              onPress={() =>
                navigation.navigate(ROUTES.COURSE_DETAIL, {
                  id: course.id,
                })
              }
            />
          ))
        )}
      </View>
    </ScreenContainer>
  );
}

const localStyles = StyleSheet.create({
  syncAlert: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 8,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  syncAlertText: {
    ...typography.captionBold,
    color: '#B45309',
  },
});
export default HomeScreen;
