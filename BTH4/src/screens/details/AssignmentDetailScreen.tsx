import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { useAppData } from '../../context/AppDataContext';
import { formatDate, isOverdue } from '../../utils/date';
import ScreenContainer from '../../components/common/ScreenContainer';
import SyncBadge from '../../components/common/SyncBadge';
import { InfoRow } from '../../components';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type ScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.ASSIGNMENT_DETAILS>;

export function AssignmentDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { id } = route.params;

  const { assignments, toggleAssignmentStatus } = useAppData();

  const assignment = useMemo(() => {
    return assignments.find((a) => String(a.id) === String(id));
  }, [assignments, id]);

  const title = assignment?.title || 'Chi tiết bài tập';

  useEffect(() => {
    navigation.setOptions({ title });
  }, [title, navigation]);

  if (!assignment) {
    return (
      <ScreenContainer>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Không tìm thấy bài tập này.</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const isDone = assignment.status === 'done';
  const overdue = !isDone && isOverdue(assignment.dueDate);

  return (
    <ScreenContainer scroll>
      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.statusBadge,
              isDone ? styles.badgeDone : styles.badgePending,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isDone ? styles.textDone : styles.textPending,
              ]}
            >
              {isDone ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </Text>
          </View>

          <SyncBadge pending={assignment.pending} />

          <Text style={styles.title}>{assignment.title}</Text>
          <Text style={styles.courseName}>
            {assignment.course?.name || 'Môn học'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin hạn nộp</Text>
          <InfoRow
            label="Hạn chót"
            value={`${formatDate(assignment.dueDate)} ${overdue ? '(Quá hạn)' : ''}`}
          />
          <InfoRow
            label="Môn học"
            value={assignment.course?.name || 'Chưa liên kết'}
          />
          <InfoRow
            label="Mã bài tập"
            value={String(assignment.id)}
            isLast
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yêu cầu & Mô tả</Text>
          <Text style={styles.descriptionText}>
            {assignment.description || 'Không có mô tả chi tiết cho bài tập này.'}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            isDone ? styles.toggleButtonUndo : styles.toggleButtonDone,
          ]}
          activeOpacity={0.8}
          onPress={() => toggleAssignmentStatus(assignment.id)}
        >
          <Text style={styles.toggleButtonText}>
            {isDone ? 'Đánh dấu Chưa hoàn thành' : 'Đánh dấu Đã hoàn thành'}
          </Text>
        </TouchableOpacity>

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
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginBottom: spacing.xs,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
  },
  badgeDone: {
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    ...typography.captionBold,
  },
  textPending: {
    color: '#B45309',
  },
  textDone: {
    color: '#15803D',
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  courseName: {
    ...typography.bodyBold,
    color: colors.primary,
    marginTop: spacing.xs,
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
  toggleButton: {
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  toggleButtonDone: {
    backgroundColor: colors.primary,
  },
  toggleButtonUndo: {
    backgroundColor: '#64748B',
  },
  toggleButtonText: {
    ...typography.bodyBold,
    color: colors.white,
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
    marginBottom: spacing.xxl,
  },
  backButtonText: {
    ...typography.bodyBold,
    color: colors.textMuted,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  notFoundText: {
    ...typography.body,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
});
