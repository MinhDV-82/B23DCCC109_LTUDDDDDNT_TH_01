import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Student } from '../types';
import { colors } from '../theme/colors';

export interface StudentCardProps {
  student: Student;
  greeting?: string;
  variant?: 'horizontal' | 'centered';
}

export function StudentCard({
  student,
  greeting = 'Xin chào,',
  variant = 'horizontal',
}: StudentCardProps) {
  const displayName = student.fullName;
  const displayCode = student.studentCode;
  const displayClass = student.className;

  if (variant === 'centered') {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>
            {displayName.charAt(0)}
          </Text>
        </View>
        <Text style={styles.nameCentered}>{displayName}</Text>
        <Text style={styles.idCentered}>Mã SV: {displayCode}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{displayName.charAt(0)}</Text>
      </View>
      <View style={styles.studentInfo}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.studentName}>{displayName}</Text>
        <Text style={styles.studentMeta}>
          Mã SV: {displayCode} • Lớp: {displayClass}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  studentInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  studentName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 1,
  },
  studentMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  centeredContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.card,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarLargeText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  nameCentered: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  idCentered: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
