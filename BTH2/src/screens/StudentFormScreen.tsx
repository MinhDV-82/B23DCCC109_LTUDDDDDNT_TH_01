import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import type { NavigationProp } from '@react-navigation/native';
import { FormField } from '../components/FormField';
import { PrimaryButton } from '../components/Buttons';
import type { RootStackParamList } from '../navigation/types';
import type { Student, StudentForm } from '../types/student';
import { formStyles } from '../styles/formStyles';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
  student?: Student;
  existingIds?: string[];
  onSubmit: (student: Student) => void;
};

function isValidDate(dateStr: string): boolean {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateStr.match(regex);
  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export function StudentFormScreen({
  navigation,
  student,
  existingIds = [],
  onSubmit,
}: Props) {
  const [form, setForm] = useState<StudentForm>({
    name: student?.name ?? '',
    dateOfBirth: student?.dateOfBirth ?? '',
    gender: student?.gender ?? 'Nam',
    email: student?.email ?? '',
    phone: student?.phone ?? '',
    className: student?.className ?? '',
    faculty: student?.faculty ?? '',
    gpa: student?.gpa ?? '',
  });
  const [id, setId] = useState(student?.id ?? '');
  const [error, setError] = useState('');

  function updateField(field: keyof StudentForm, value: string) {
    setForm(current => ({ ...current, [field]: value }));
  }

  function submit() {
    const score = Number(form.gpa);
    if (
      !id.trim() ||
      !form.name.trim() ||
      !form.dateOfBirth.trim() ||
      !form.email.trim() ||
      !form.className.trim() ||
      !form.faculty.trim() ||
      !form.gpa.trim()
    ) {
      return setError('Vui lòng điền đầy đủ các trường bắt buộc (*).');
    }
    if (!student && existingIds.includes(id.trim())) {
      return setError('Mã sinh viên đã tồn tại.');
    }
    if (!isValidDate(form.dateOfBirth.trim())) {
      return setError(
        'Ngày sinh phải theo định dạng DD/MM/YYYY (ví dụ: 15/03/2004) và là ngày hợp lệ.',
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      return setError('Email không đúng định dạng.');
    }
    if (!Number.isFinite(score) || score < 0 || score > 10) {
      return setError('GPA phải là số trong khoảng từ 0 đến 10.');
    }

    setError('');
    onSubmit({ ...form, id: id.trim(), gpa: score.toFixed(1) });
    Alert.alert(
      'Thành công',
      student
        ? 'Cập nhật thông tin sinh viên thành công!'
        : 'Thêm sinh viên mới thành công!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <KeyboardAvoidingView
      style={formStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={formStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={formStyles.intro}>
          {student ? 'Cập nhật hồ sơ sinh viên' : 'Tạo hồ sơ sinh viên mới'}
        </Text>
        <FormField
          label="Mã sinh viên *"
          value={id}
          onChangeText={setId}
          editable={!student}
          placeholder="Ví dụ: SV004"
        />
        <FormField
          label="Họ và tên *"
          value={form.name}
          onChangeText={value => updateField('name', value)}
          placeholder="Nguyễn Văn A"
        />
        <FormField
          label="Ngày sinh (DD/MM/YYYY) *"
          value={form.dateOfBirth}
          onChangeText={value => updateField('dateOfBirth', value)}
          placeholder="DD/MM/YYYY (ví dụ: 15/03/2004)"
        />
        <Text style={formStyles.fieldLabel}>Giới tính</Text>
        <View style={formStyles.genderRow}>
          {['Nam', 'Nữ', 'Khác'].map(gender => (
            <Pressable
              key={gender}
              onPress={() => updateField('gender', gender)}
              style={[
                formStyles.genderButton,
                form.gender === gender && formStyles.genderButtonActive,
              ]}
            >
              <Text
                style={[
                  formStyles.genderText,
                  form.gender === gender && formStyles.genderTextActive,
                ]}
              >
                {gender}
              </Text>
            </Pressable>
          ))}
        </View>
        <FormField
          label="Email *"
          value={form.email}
          onChangeText={value => updateField('email', value)}
          keyboardType="email-address"
          placeholder="sinhvien@example.com"
        />
        <FormField
          label="Số điện thoại"
          value={form.phone}
          onChangeText={value => updateField('phone', value)}
          keyboardType="phone-pad"
          placeholder="0901234567"
        />
        <FormField
          label="Lớp *"
          value={form.className}
          onChangeText={value => updateField('className', value)}
          placeholder="DHKTPM18A"
        />
        <FormField
          label="Khoa *"
          value={form.faculty}
          onChangeText={value => updateField('faculty', value)}
          placeholder="Công nghệ thông tin"
        />
        <FormField
          label="GPA *"
          value={form.gpa}
          onChangeText={value => updateField('gpa', value)}
          keyboardType="decimal-pad"
          placeholder="0.0 - 10.0"
        />
        {!!error && <Text style={formStyles.errorText}>{error}</Text>}
        <PrimaryButton
          title={student ? 'Lưu thay đổi' : 'Thêm sinh viên'}
          onPress={submit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
