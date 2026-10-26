import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Session } from '../types';
import { colors } from '../theme/colors';

export interface ScheduleCardProps {
  scheduleItem: Session;
  onPress?: () => void;
}

export function ScheduleCard({ scheduleItem, onPress }: ScheduleCardProps) {
  const courseName = scheduleItem.course?.name || 'Môn học';
  const lecturerName = scheduleItem.course?.lecturer || 'Chưa phân công';
  const timeDisplay = `${scheduleItem.startTime} - ${scheduleItem.endTime}`;
  const dayDisplay =
    scheduleItem.dayOfWeek === 8
      ? 'Chủ nhật'
      : `Thứ ${scheduleItem.dayOfWeek}`;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.timeBadge}>
        <Text style={styles.dayText}>{dayDisplay}</Text>
        <Text style={styles.timeText}>{timeDisplay}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.courseName}>{courseName}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.roomText}>Phòng: {scheduleItem.room || 'Đang cập nhật'}</Text>
          <Text style={styles.lecturerText}>
            Giảng viên: {lecturerName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
    minWidth: 70,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  timeText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'column',
    gap: 2,
  },
  roomText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  lecturerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
