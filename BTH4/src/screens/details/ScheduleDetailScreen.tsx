import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { sessionService } from '../../api/sessionService';
import { CACHE_KEYS } from '../../storage/keys';
import { useCachedQuery } from '../../hooks/useCachedQuery';
import { Session } from '../../types';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import { InfoRow } from '../../components';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type ScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.SCHEDULE_DETAILS>;

export function ScheduleDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { id } = route.params;

  const {
    data: sessions,
    loading,
    error,
    refresh,
  } = useCachedQuery<Session[]>(CACHE_KEYS.SESSIONS, sessionService.getAll);

  const session = useMemo(() => {
    return sessions?.find((s) => Number(s.id) === Number(id));
  }, [sessions, id]);

  const courseName = session?.course?.name || 'Chi tiết buổi học';

  useEffect(() => {
    navigation.setOptions({ title: courseName });
  }, [courseName, navigation]);

  if (loading && !session) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải chi tiết buổi học..." />
      </ScreenContainer>
    );
  }

  if (error && !session) {
    return (
      <ScreenContainer>
        <ErrorView message={error} onRetry={refresh} />
      </ScreenContainer>
    );
  }

  if (!session) return null;

  const dayText =
    session.dayOfWeek === 8
      ? 'Chủ nhật'
      : `Thứ ${session.dayOfWeek}`;

  return (
    <ScreenContainer scroll>
      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{dayText}</Text>
          </View>
          <Text style={styles.timeText}>{session.startTime} - {session.endTime}</Text>
          <Text style={styles.courseName}>{session.course?.name || 'Môn học'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin lớp học</Text>
          <InfoRow label="Phòng học" value={session.room} />
          <InfoRow label="Giảng viên" value={session.course?.lecturer || 'Chưa cập nhật'} />
          <InfoRow label="Mã môn học" value={session.course?.code || String(session.courseId)} isLast />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú buổi học</Text>
          <Text style={styles.descriptionText}>
            {session.note || 'Không có ghi chú thêm.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại thời khóa biểu</Text>
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
    marginBottom: spacing.xs,
  },
  badgeText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  timeText: {
    ...typography.bodyBold,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  courseName: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
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
