import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScheduleItem } from '../types';
import { colors } from '../styles/theme';

export interface ScheduleCardProps {
  scheduleItem: ScheduleItem;
  onPress?: () => void;
}

export function ScheduleCard({ scheduleItem, onPress }: ScheduleCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.timeBadge}>
        <Text style={styles.dayText}>{scheduleItem.dayOfWeek}</Text>
        <Text style={styles.timeText}>{scheduleItem.time}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.subjectName}>{scheduleItem.subjectName}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.roomText}>Phòng: {scheduleItem.room}</Text>
          <Text style={styles.lecturerText}>Giảng viên: {scheduleItem.lecturer}</Text>
        </View>
      </View>
      <Text style={styles.arrowIcon}>›</Text>
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
  subjectName: {
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
  arrowIcon: {
    fontSize: 20,
    color: colors.textMuted,
    marginLeft: 8,
  },
});

