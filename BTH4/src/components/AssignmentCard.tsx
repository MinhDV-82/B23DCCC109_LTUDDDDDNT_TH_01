import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Assignment } from '../types';
import { colors } from '../theme/colors';
import { formatDate, isOverdue } from '../utils/date';

export interface AssignmentCardProps {
  assignment: Assignment;
  onPress?: () => void;
  onToggleStatus?: (id: string | number) => void;
  variant?: 'full' | 'compact';
}

export function AssignmentCard({
  assignment,
  onPress,
  onToggleStatus,
  variant = 'full',
}: AssignmentCardProps) {
  const isDone = assignment.status === 'done';
  const courseName = assignment.course?.name || 'Môn học';
  const formattedDue = assignment.dueDate?.includes('T')
    ? formatDate(assignment.dueDate)
    : assignment.dueDate;
  const overdue = !isDone && isOverdue(assignment.dueDate);

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.compactContent}>
          <Text style={styles.compactCourse}>{courseName}</Text>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {assignment.title}
          </Text>
          <Text style={[styles.compactDue, overdue && styles.textOverdue]}>
            Hạn nộp: {formattedDue} {overdue ? '(Quá hạn)' : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, isDone && styles.cardCompleted]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <TouchableOpacity
        style={[styles.checkbox, isDone && styles.checkboxChecked]}
        onPress={() => onToggleStatus && onToggleStatus(assignment.id)}
      >
        {isDone && <View style={styles.checkboxInner} />}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.courseName}>{courseName}</Text>
          {assignment.pending && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>Chưa đồng bộ</Text>
            </View>
          )}
        </View>

        <Text style={[styles.title, isDone && styles.titleCompleted]}>
          {assignment.title}
        </Text>

        <View style={styles.footerRow}>
          <Text style={[styles.dueDate, overdue && styles.textOverdue]}>
            Hạn nộp: {formattedDue} {overdue ? '(Quá hạn)' : ''}
          </Text>
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
  cardCompleted: {
    backgroundColor: '#F8FAFC',
    opacity: 0.8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  pendingText: {
    fontSize: 10,
    color: '#B45309',
    fontWeight: '700',
  },
  courseName: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dueDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  textOverdue: {
    color: '#DC2626',
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgePending: {
    backgroundColor: '#FFF7ED',
  },
  badgeDone: {
    backgroundColor: '#F0FDF4',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  textPending: {
    color: '#D97706',
  },
  textDone: {
    color: '#15803D',
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  compactContent: {
    flex: 1,
  },
  compactCourse: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  compactDue: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
