import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { initialStudent } from '../../data/mocData';
import { Student } from '../../types';
import { profileStyles as styles } from '../../styles/profileStyles';
import { StudentCard, InfoRow } from '../../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PROFILE_STORAGE_KEY = '@student_profile_data';

export function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [student, setStudent] = useState<Student>(initialStudent);

  // State cho Modal chỉnh sửa
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Đọc thông tin đã lưu trong AsyncStorage
  useEffect(() => {
    async function loadProfile() {
      try {
        const saved = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (saved !== null) {
          setStudent(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Lỗi khi tải thông tin cá nhân:', e);
      }
    }
    loadProfile();
  }, []);

  // Mở modal sửa thông tin
  const handleOpenEdit = () => {
    setEditName(student.name);
    setEditEmail(student.email);
    setEditPhone(student.phone);
    setIsModalVisible(true);
  };

  // Lưu thông tin mới vào AsyncStorage
  const handleSaveProfile = async () => {
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ các thông tin!');
      return;
    }

    const updatedStudent: Student = {
      ...student,
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    };

    setStudent(updatedStudent);
    setIsModalVisible(false);

    try {
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(updatedStudent),
      );
      Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật!');
    } catch (e) {
      console.error('Lỗi khi lưu profile:', e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* 1. HEADER AVATAR & HỌ TÊN */}
        <StudentCard student={student} variant="centered" />

        {/* 2. BẢNG THÔNG TIN CHI TIẾT */}
        <View style={styles.infoCard}>
          <Text style={styles.cardSectionTitle}>Thông tin sinh viên</Text>
          <InfoRow label="Lớp sinh hoạt" value={student.class} />
          <InfoRow label="Ngành học" value={student.major} />
          <InfoRow label="Email" value={student.email} />
          <InfoRow label="Số điện thoại" value={student.phone} isLast />
        </View>

        {/* 3. CÁC NÚT HÀNH ĐỘNG */}
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={handleOpenEdit}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gradeButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('GradeDetails')}
        >
          <Text style={styles.gradeButtonText}>Xem kết quả học tập (Bảng điểm)</Text>
        </TouchableOpacity>

        {/* MODAL CHỈNH SỬA THÔNG TIN */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>

              <Text style={styles.inputLabel}>Họ và tên</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Nhập họ và tên"
              />

              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                placeholder="Nhập email"
              />

              <Text style={styles.inputLabel}>Số điện thoại</Text>
              <TextInput
                style={styles.input}
                value={editPhone}
                onChangeText={setEditPhone}
                keyboardType="phone-pad"
                placeholder="Nhập số điện thoại"
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}