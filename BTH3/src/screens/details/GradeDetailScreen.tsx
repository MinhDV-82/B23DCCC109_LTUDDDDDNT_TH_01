import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockGrades } from '../../data/mocData';
import { gradeDetailStyles as styles } from '../../styles/gradeDetailStyles';

export function GradeDetailScreen() {
  const navigation = useNavigation();

  // Tính toán GPA trung bình tích lũy
  const totalCredits = mockGrades.reduce((sum, item) => sum + item.credits, 0);
  const weightedSum = mockGrades.reduce(
    (sum, item) => sum + item.averageScore * item.credits,
    0,
  );
  const gpa10 = (weightedSum / totalCredits).toFixed(2);
  const gpa4 = ((parseFloat(gpa10) / 10) * 4).toFixed(2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* THẺ TỔNG KẾT GPA */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>KẾT QUẢ HỌC TẬP TÍCH LŨY</Text>
        <View style={styles.gpaRow}>
          <View style={styles.gpaItem}>
            <Text style={styles.gpaNumber}>{gpa10}</Text>
            <Text style={styles.gpaLabel}>Hệ 10</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.gpaItem}>
            <Text style={styles.gpaNumber}>{gpa4}</Text>
            <Text style={styles.gpaLabel}>Hệ 4</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.gpaItem}>
            <Text style={styles.gpaNumber}>{totalCredits}</Text>
            <Text style={styles.gpaLabel}>Tín chỉ</Text>
          </View>
        </View>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>Xếp loại: Giỏi</Text>
        </View>
      </View>

      {/* DANH SÁCH BẢNG ĐIỂM CHI TIẾT */}
      <Text style={styles.sectionHeaderTitle}>Chi tiết điểm từng môn học</Text>

      {mockGrades.map(item => (
        <View key={item.subjectId} style={styles.gradeCard}>
          <View style={styles.gradeCardHeader}>
            <View style={styles.subjectCodeBadge}>
              <Text style={styles.subjectCodeText}>{item.subjectId}</Text>
            </View>
            <Text style={styles.subjectName}>{item.subjectName}</Text>
            <View style={styles.letterBadge}>
              <Text style={styles.letterText}>{item.letterGrade}</Text>
            </View>
          </View>

          <View style={styles.scoreRow}>
            <View style={styles.scoreCol}>
              <Text style={styles.scoreLabel}>Chuyên cần</Text>
              <Text style={styles.scoreVal}>{item.attendanceScore}</Text>
            </View>
            <View style={styles.scoreCol}>
              <Text style={styles.scoreLabel}>Giữa kỳ</Text>
              <Text style={styles.scoreVal}>{item.midtermScore}</Text>
            </View>
            <View style={styles.scoreCol}>
              <Text style={styles.scoreLabel}>Cuối kỳ</Text>
              <Text style={styles.scoreVal}>{item.finalScore}</Text>
            </View>
            <View style={styles.scoreCol}>
              <Text style={styles.scoreLabel}>Tổng kết</Text>
              <Text style={[styles.scoreVal, styles.scoreTotal]}>
                {item.averageScore}
              </Text>
            </View>
          </View>
        </View>
      ))}

      {/* NÚT QUAY LẠI */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

