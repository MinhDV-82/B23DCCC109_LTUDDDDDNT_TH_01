import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppData } from '../../context/AppDataContext';
import { validateAssignmentForm } from '../../utils/validators';
import ScreenContainer from '../../components/common/ScreenContainer';
import FormInput from '../../components/common/FormInput';
import AppButton from '../../components/common/AppButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export function AssignmentFormScreen() {
  const navigation = useNavigation<any>();
  const { courses, addAssignment } = useAppData();

  const [selectedCourseId, setSelectedCourseId] = useState<number>(
    courses[0]?.id ? Number(courses[0].id) : 1
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const [dueDateString, setDueDateString] = useState(defaultDueDate);
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const isoDueDate = `${dueDateString}T23:59:00Z`;

    const validation = validateAssignmentForm(title, isoDueDate);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      await addAssignment({
        courseId: selectedCourseId,
        title: title.trim(),
        description: description.trim(),
        dueDate: isoDueDate,
        status: 'todo',
        updatedAt: new Date().toISOString(),
      });

      Alert.alert('Thành công', 'Đã thêm bài tập mới!');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Không thể lưu bài tập.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer scroll>
      <View style={styles.content}>
        <Text style={styles.heading}>Thêm bài tập mới</Text>

        <Text style={styles.label}>Chọn môn học:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.courseList}
        >
          {courses.map((c) => {
            const isSelected = selectedCourseId === Number(c.id);
            return (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.courseChip,
                  isSelected && styles.courseChipActive,
                ]}
                onPress={() => setSelectedCourseId(Number(c.id))}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.courseChipText,
                    isSelected && styles.courseChipTextActive,
                  ]}
                >
                  {c.code} - {c.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <FormInput
          label="Tiêu đề bài tập *"
          placeholder="VD: Bài tập lớn React Native..."
          value={title}
          onChangeText={setTitle}
          error={errors.title}
        />

        <FormInput
          label="Hạn nộp (Định dạng YYYY-MM-DD) *"
          placeholder="VD: 2026-11-15"
          value={dueDateString}
          onChangeText={setDueDateString}
          error={errors.dueDate}
        />

        <FormInput
          label="Yêu cầu & Mô tả chi tiết"
          placeholder="Nhập nội dung yêu cầu của bài tập..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <AppButton
          title="Lưu bài tập"
          onPress={handleSubmit}
          loading={submitting}
          style={styles.submitBtn}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  heading: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodyBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  courseList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  courseChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  courseChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  courseChipText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  courseChipTextActive: {
    color: colors.white,
  },
  submitBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
  },
});
