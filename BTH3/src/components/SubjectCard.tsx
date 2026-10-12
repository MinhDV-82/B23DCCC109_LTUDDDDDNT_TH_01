import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Subject } from '../types';
import { colors } from '../styles/theme';

export interface SubjectCardProps {
  subject: Subject;
  onPress?: () => void;
  variant?: 'full' | 'compact';
}

export function SubjectCard({
  subject,
  onPress,
  variant = 'full',
}: SubjectCardProps) {
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View style={styles.compactCodeBadge}>
          <Text style={styles.compactCodeText}>{subject.id}</Text>
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>
            {subject.name}
          </Text>
          <Text style={styles.compactMeta}>
            {subject.credits} tín chỉ • Phòng {subject.room}
          </Text>
        </View>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.cardHeader}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{subject.id}</Text>
        </View>
        <Text style={styles.creditsText}>{subject.credits} tín chỉ</Text>
      </View>
      <Text style={styles.subjectName}>{subject.name}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.lecturerText}>GV: {subject.lecturer}</Text>
        <Text style={styles.roomText}>Phòng: {subject.room}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Full variant (SubjectsScreen)
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
  subjectName: {
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
    color: colors.textSecondary,
  },
  roomText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
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
  compactCodeBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  compactCodeText: {
    fontSize: 12,
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
  },
  compactMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 20,
    color: colors.textMuted,
    marginLeft: 8,
  },
});

