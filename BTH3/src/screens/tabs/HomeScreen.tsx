import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { initialStudent, mockSubjects, initialAssignments } from '../../data/mocData';
import { Student, Assignment } from '../../types';
import { homeStyles as styles } from '../../styles/homeStyles';
import { StudentCard, SubjectCard, AssignmentCard, EmptyState } from '../../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [student, setStudent] = useState<Student>(initialStudent);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

  // Đọc dữ liệu mới nhất từ AsyncStorage mỗi khi quay lại Trang chủ
  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        try {
          const storedProfile = await AsyncStorage.getItem('@student_profile_data');
          if (storedProfile) {
            setStudent(JSON.parse(storedProfile));
          }

          const storedAssignments = await AsyncStorage.getItem('@assignments_data');
          if (storedAssignments) {
            setAssignments(JSON.parse(storedAssignments));
          }
        } catch (e) {
          console.error('Lỗi tải dữ liệu HomeScreen:', e);
        }
      }
      loadData();
    }, []),
  );

  // Lọc các bài tập chưa hoàn thành sắp đến hạn
  const upcomingAssignments = assignments.filter(item => !item.isCompleted);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* 1. THẺ THÔNG TIN SINH VIÊN */}
        <StudentCard student={student} />

        {/* 2. CÁC BÀI TẬP SẮP ĐẾN HẠN */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
          <Text style={styles.badgeCount}>{upcomingAssignments.length} bài</Text>
        </View>

        {upcomingAssignments.length === 0 ? (
          <EmptyState title="Tuyệt vời! Không có bài tập nào sắp đến hạn." />
        ) : (
          upcomingAssignments.map(assignment => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              variant="compact"
              onPress={() => navigation.navigate('AssignmentDetails', { assignment })}
            />
          ))
        )}

        {/* 3. DANH SÁCH MÔN HỌC ĐANG HỌC */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học đang học</Text>
          <Text style={styles.badgeCount}>{mockSubjects.length} môn</Text>
        </View>

        {mockSubjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            variant="compact"
            onPress={() => navigation.navigate('SubjectDetails', { subject })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}