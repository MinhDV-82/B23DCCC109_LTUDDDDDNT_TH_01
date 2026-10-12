import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Assignment } from '../types';
import { colors } from '../styles/theme';

export interface AssignmentCardProps {
  assignment: Assignment;
  onPress?: () => void;
  onToggleStatus?: (id: string) => void;
  variant?: 'full' | 'compact';
}

export function AssignmentCard({
  assignment,
  onPress,
  onToggleStatus,
  variant = 'full',
}: AssignmentCardProps) {
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.compactContent}>
          <Text style={styles.compactSubject}>{assignment.subjectName}</Text>
          <Text style={styles.compactTitle} numberOfLines={1}>
            {assignment.title}
          </Text>
          <Text style={styles.compactDue}>Hạn nộp: {assignment.dueDate}</Text>
        </View>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        assignment.isCompleted && styles.cardCompleted,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          assignment.isCompleted && styles.checkboxChecked,
        ]}
        onPress={() => onToggleStatus && onToggleStatus(assignment.id)}
      >
        {assignment.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.subjectName}>{assignment.subjectName}</Text>
        <Text
          style={[
            styles.title,
            assignment.isCompleted && styles.titleCompleted,
          ]}
        >
          {assignment.title}
        </Text>
        <View style={styles.footerRow}>
          <Text style={styles.dueDate}>Hạn nộp: {assignment.dueDate}</Text>
          <View
            style={[
              styles.statusBadge,
              assignment.isCompleted ? styles.badgeDone : styles.badgePending,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                assignment.isCompleted ? styles.textDone : styles.textPending,
              ]}
            >
              {assignment.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Full variant (AssignmentsScreen)
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
    borderColor: '#F1F5F9',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  subjectName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
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
  },
  dueDate: {
    fontSize: 12,
    color: colors.textSecondary,
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

  // Compact variant (HomeScreen)
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
  compactSubject: {
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
  arrowIcon: {
    fontSize: 20,
    color: colors.textMuted,
    marginLeft: 8,
  },
});

