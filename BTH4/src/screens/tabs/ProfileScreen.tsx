import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { useAppData } from '../../context/AppDataContext';
import { calcGpa } from '../../utils/gpa';
import { Grade } from '../../types';
import ScreenContainer from '../../components/common/ScreenContainer';
import FormInput from '../../components/common/FormInput';
import AppButton from '../../components/common/AppButton';
import LoadingView from '../../components/common/LoadingView';
import { StudentCard, InfoRow } from '../../components';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { student, grades, loading, updateStudent } = useAppData();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [className, setClassName] = useState('');
  const [updating, setUpdating] = useState(false);

  const [selectedSemester, setSelectedSemester] = useState('Tất cả');

  const { gpa, totalCredits } = useMemo(() => {
    return calcGpa(grades);
  }, [grades]);

  const semesters = useMemo(() => {
    if (!grades) return ['Tất cả'];
    const unique = Array.from(new Set(grades.map((g) => g.semester).filter(Boolean)));
    return ['Tất cả', ...unique];
  }, [grades]);

  const filteredGrades = useMemo(() => {
    if (!grades) return [];
    if (selectedSemester === 'Tất cả') return grades;
    return grades.filter((g) => g.semester === selectedSemester);
  }, [grades, selectedSemester]);

  const handleOpenEdit = () => {
    if (student) {
      setFullName(student.fullName);
      setEmail(student.email);
      setPhone(student.phone);
      setClassName(student.className);
      setIsModalVisible(true);
    }
  };

  const handleSaveProfile = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ họ tên, email và số điện thoại.');
      return;
    }

    setUpdating(true);
    try {
      await updateStudent({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        className: className.trim(),
      });
      setIsModalVisible(false);
      Alert.alert('Thành công', 'Đã lưu thông tin cá nhân!');
    } catch {
    } finally {
      setUpdating(false);
    }
  };

  if (loading && !student) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải thông tin cá nhân..." />
      </ScreenContainer>
    );
  }

  if (!student) return null;

  return (
    <ScreenContainer scroll>
      <View style={styles.content}>
        <StudentCard student={student} variant="centered" />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thông tin sinh viên</Text>
          <InfoRow label="Mã sinh viên" value={student.studentCode} />
          <InfoRow label="Lớp sinh hoạt" value={student.className} />
          <InfoRow label="Ngành học" value={student.major} />
          <InfoRow label="Email" value={student.email} />
          <InfoRow label="Số điện thoại" value={student.phone} isLast />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={handleOpenEdit}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>

        <View style={styles.gpaCard}>
          <Text style={styles.gpaHeading}>KẾT QUẢ HỌC TẬP TÍCH LŨY</Text>
          <View style={styles.gpaRow}>
            <View style={styles.gpaCol}>
              <Text style={styles.gpaVal}>{gpa}</Text>
              <Text style={styles.gpaLbl}>GPA Hệ 4</Text>
            </View>
            <View style={styles.vDivider} />
            <View style={styles.gpaCol}>
              <Text style={styles.gpaVal}>{totalCredits}</Text>
              <Text style={styles.gpaLbl}>Tín chỉ tích lũy</Text>
            </View>
          </View>
        </View>

        <View style={styles.gradeSection}>
          <View style={styles.gradeHeaderRow}>
            <Text style={styles.cardTitle}>Bảng điểm học phần</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.semList}
          >
            {semesters.map((sem) => {
              const isSelected = selectedSemester === sem;
              return (
                <TouchableOpacity
                  key={sem}
                  style={[styles.semChip, isSelected && styles.semChipActive]}
                  onPress={() => setSelectedSemester(sem)}
                >
                  <Text
                    style={[
                      styles.semChipText,
                      isSelected && styles.semChipTextActive,
                    ]}
                  >
                    {sem}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {filteredGrades.map((g: Grade) => {
            const courseName = g.course?.name || `Môn học #${g.courseId}`;
            const credits = g.course?.credits || 3;

            return (
              <TouchableOpacity
                key={g.id}
                style={styles.gradeRow}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(ROUTES.GRADE_DETAILS, { id: g.id })
                }
              >
                <View style={styles.gradeLeft}>
                  <Text style={styles.gradeCourseName}>{courseName}</Text>
                  <Text style={styles.gradeMeta}>{credits} tín chỉ • {g.semester}</Text>
                </View>

                <View style={styles.gradeRight}>
                  <Text style={styles.gradeTotal}>{g.total}</Text>
                  <View style={styles.letterTag}>
                    <Text style={styles.letterTagText}>{g.letter}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sửa thông tin cá nhân</Text>

              <FormInput
                label="Họ và tên *"
                value={fullName}
                onChangeText={setFullName}
              />
              <FormInput
                label="Lớp sinh hoạt *"
                value={className}
                onChangeText={setClassName}
              />
              <FormInput
                label="Email *"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <FormInput
                label="Số điện thoại *"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <View style={styles.modalButtons}>
                <AppButton
                  title="Hủy"
                  variant="outline"
                  onPress={() => setIsModalVisible(false)}
                  style={styles.modalBtn}
                />
                <AppButton
                  title="Lưu thay đổi"
                  onPress={handleSaveProfile}
                  loading={updating}
                  style={styles.modalBtn}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  editButton: {
    minHeight: 44,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  editButtonText: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  gpaCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  gpaHeading: {
    ...typography.captionBold,
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  gpaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  gpaCol: {
    alignItems: 'center',
    flex: 1,
  },
  gpaVal: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  gpaLbl: {
    ...typography.captionBold,
    color: colors.textMuted,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.primaryBorder,
  },
  gradeSection: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xxl,
  },
  gradeHeaderRow: {
    marginBottom: spacing.xs,
  },
  semList: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  semChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  semChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  semChipText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  semChipTextActive: {
    color: colors.white,
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  gradeLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  gradeCourseName: {
    ...typography.bodyBold,
    color: colors.text,
  },
  gradeMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  gradeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  gradeTotal: {
    ...typography.bodyBold,
    color: colors.text,
  },
  letterTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  letterTagText: {
    ...typography.captionBold,
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  modalBtn: {
    flex: 1,
  },
});
