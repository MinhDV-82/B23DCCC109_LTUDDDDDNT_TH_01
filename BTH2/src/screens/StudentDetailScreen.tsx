import { Alert, ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InfoRow } from '../components/InfoRow';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import type { RootStackParamList } from '../navigation/types';
import type { Student } from '../types/student';
import { getClassification } from '../utils/student';
import { detailStyles } from '../styles/detailStyles';
import { listStyles } from '../styles/listStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'> & {
  students: Student[];
  onDelete: (studentId: string) => void;
};

export function StudentDetailScreen({
  navigation,
  route,
  students,
  onDelete,
}: Props) {
  const student = students.find(item => item.id === route.params.studentId);
  if (!student)
    return <Text style={listStyles.emptyText}>Không tìm thấy sinh viên.</Text>;

  function confirmDelete() {
    const studentId = student!.id;
    const studentName = student!.name;
    Alert.alert('Xóa sinh viên', `Bạn có chắc muốn xóa ${studentName}?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: () => {
          onDelete(studentId);
          Alert.alert('Thành công', 'Đã xóa sinh viên thành công!', [
            {
              text: 'OK',
              onPress: () => navigation.popToTop(),
            },
          ]);
        },
      },
    ]);
  }

  const details = [
    ['Mã sinh viên', student.id],
    ['Ngày sinh', student.dateOfBirth],
    ['Giới tính', student.gender],
    ['Email', student.email],
    ['Số điện thoại', student.phone],
    ['Lớp', student.className],
    ['Khoa', student.faculty],
  ];

  return (
    <ScrollView contentContainerStyle={detailStyles.content}>
      <View style={detailStyles.profileHero}>
        <View style={detailStyles.largeAvatar}>
          <Text style={detailStyles.largeAvatarText}>
            {student.name.charAt(0)}
          </Text>
        </View>
        <Text style={detailStyles.name}>{student.name}</Text>
        <Text style={detailStyles.className}>
          {student.id} • {student.className}
        </Text>
        <View style={detailStyles.scorePill}>
          <Text style={detailStyles.scoreText}>
            GPA {student.gpa} · {getClassification(student.gpa)}
          </Text>
        </View>
      </View>
      <View style={detailStyles.infoPanel}>
        {details.map(([label, value]) => (
          <InfoRow key={label} label={label} value={value} />
        ))}
      </View>
      <View style={detailStyles.actionRow}>
        <PrimaryButton
          title="Chỉnh sửa"
          onPress={() => navigation.navigate('Edit', { studentId: student.id })}
        />
        <SecondaryButton title="Xóa" danger onPress={confirmDelete} />
      </View>
    </ScrollView>
  );
}
