import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Course } from '../types';
import colors from '../theme/colors';

export interface CourseCardProps {
  course: Course;
  onPress?: () => void;
  variant?: 'full' | 'compact';
}

export function CourseCard({
  course,
  onPress,
  variant = 'full',
}: CourseCardProps) {
  const codeDisplay = course.code;
  const extraInfo = course.semester;

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.compactCodeBadge}>
          <Text style={styles.compactCodeText}>{codeDisplay}</Text>
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>
            {course.name}
          </Text>
          <Text style={styles.compactMeta}>
            {course.credits} tín chỉ {extraInfo ? `• ${extraInfo}` : ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{codeDisplay}</Text>
        </View>
        <Text style={styles.creditsText}>{course.credits} tín chỉ</Text>
      </View>
      <Text style={styles.courseName}>{course.name}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.lecturerText}>GV: {course.lecturer}</Text>
        {extraInfo ? <Text style={styles.roomText}>{extraInfo}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  creditsText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
  },
  lecturerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  roomText: {
    fontSize: 12,
    color: colors.textSecondary,
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
  compactCodeBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  compactCodeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  compactInfo: {
    flex: 1,
  },
  compactName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  compactMeta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
export default CourseCard;

