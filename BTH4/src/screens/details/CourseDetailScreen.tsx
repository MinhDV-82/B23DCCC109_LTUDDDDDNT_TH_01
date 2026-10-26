import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { courseService } from '../../api/courseService';
import { CACHE_KEYS } from '../../storage/keys';
import { useCachedQuery } from '../../hooks/useCachedQuery';
import { useAppData } from '../../context/AppDataContext';
import { Course } from '../../types';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import { InfoRow, AssignmentCard } from '../../components';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type ScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.COURSE_DETAIL>;

export function CourseDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { id } = route.params;

  const {
    data: course,
    loading,
    error,
    refresh,
  } = useCachedQuery<Course>(CACHE_KEYS.COURSE_DETAIL(id), () =>
    courseService.getById(id)
  );

  const { assignments } = useAppData();

  useEffect(() => {
    if (course?.name) {
      navigation.setOptions({ title: course.name });
    }
  }, [course, navigation]);

  if (loading && !course) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải chi tiết môn học..." />
      </ScreenContainer>
    );
  }

  if (error && !course) {
    return (
      <ScreenContainer>
        <ErrorView message={error} onRetry={refresh} />
      </ScreenContainer>
    );
  }

  if (!course) return null;

  const courseAssignments = assignments.filter(
    (a) => Number(a.courseId) === Number(id)
  );

  return (
    <ScreenContainer scroll>
      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{course.code}</Text>
          </View>
          <Text style={styles.title}>{course.name}</Text>
          <Text style={styles.credits}>{course.credits} Tín chỉ • {course.semester}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin học phần</Text>
          <InfoRow label="Giảng viên" value={course.lecturer} />
          <InfoRow label="Mã học phần" value={course.code} />
          <InfoRow label="Học kỳ" value={course.semester} isLast />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả môn học</Text>
          <Text style={styles.descriptionText}>{course.description || 'Chưa có mô tả.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bài tập của môn ({courseAssignments.length})</Text>
          {courseAssignments.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có bài tập nào cho môn này.</Text>
          ) : (
            courseAssignments.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                variant="compact"
                onPress={() =>
                  navigation.navigate(ROUTES.ASSIGNMENT_DETAILS, { id: a.id })
                }
              />
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại danh sách</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  cardHeader: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  credits: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  descriptionText: {
    ...typography.body,
    color: colors.textBody,
    lineHeight: 22,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
  backButton: {
    minHeight: 44,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
  },
  backButtonText: {
    ...typography.bodyBold,
    color: colors.textMuted,
  },
});
export default CourseDetailScreen;

