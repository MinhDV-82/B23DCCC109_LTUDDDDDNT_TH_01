import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { useAppData } from '../../context/AppDataContext';
import { toScale4 } from '../../utils/gpa';
import ScreenContainer from '../../components/common/ScreenContainer';
import { InfoRow } from '../../components';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type ScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.GRADE_DETAILS>;

export function GradeDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<any>();
  const id = route.params?.id;

  const { grades } = useAppData();

  const grade = useMemo(() => {
    return grades.find((g) => Number(g.id) === Number(id));
  }, [grades, id]);

  const courseName = grade?.course?.name || 'Chi tiết kết quả học tập';

  useEffect(() => {
    navigation.setOptions({ title: courseName });
  }, [courseName, navigation]);

  if (!grade) {
    return (
      <ScreenContainer>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Không tìm thấy kết quả học tập này.</Text>
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

  const { gpa4 } = toScale4(grade.total);
  const credits = grade.course?.credits || 3;

  return (
    <ScreenContainer scroll>
      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.courseName}>{courseName}</Text>
          <Text style={styles.courseMeta}>
            {credits} tín chỉ • {grade.semester}
          </Text>

          <View style={styles.scoreRow}>
            <View style={styles.scoreCol}>
              <Text style={styles.totalScore}>{grade.total}</Text>
              <Text style={styles.scoreLabel}>Tổng kết (Hệ 10)</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.scoreCol}>
              <Text style={styles.letterScore}>{grade.letter}</Text>
              <Text style={styles.scoreLabel}>Điểm chữ (Hệ 4: {gpa4.toFixed(1)})</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Các thành phần điểm</Text>
          <InfoRow label="Chuyên cần (10%)" value={`${grade.attendance} điểm`} />
          <InfoRow label="Giữa kỳ (30%)" value={`${grade.midterm} điểm`} />
          <InfoRow label="Cuối kỳ (60%)" value={`${grade.final} điểm`} />
          <InfoRow label="Điểm tổng kết" value={`${grade.total} điểm`} />
          <InfoRow label="Điểm chữ" value={grade.letter} isLast />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Công thức tính điểm</Text>
          <Text style={styles.formulaText}>
            • Điểm tổng kết = (10% × Chuyên cần) + (30% × Giữa kỳ) + (60% × Cuối kỳ)
          </Text>
          <Text style={styles.formulaText}>
            • Điểm chữ {grade.letter} tương đương {gpa4.toFixed(1)} trên thang điểm GPA hệ 4.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại bảng điểm</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  courseName: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  courseMeta: {
    ...typography.captionBold,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  scoreCol: {
    alignItems: 'center',
    flex: 1,
  },
  totalScore: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
  },
  letterScore: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.success,
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
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
  formulaText: {
    ...typography.body,
    color: colors.textBody,
    lineHeight: 22,
    marginBottom: spacing.xs,
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
