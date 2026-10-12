import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { Assignment } from '../../types';
import { assignmentDetailStyles as styles } from '../../styles/assignmentDetailStyles';

type ScreenRouteProp = RouteProp<RootStackParamList, 'AssignmentDetails'>;
const STORAGE_KEY = '@assignments_data';

export function AssignmentDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation();
  const [assignment, setAssignment] = useState<Assignment>(route.params.assignment);

  const toggleStatus = async () => {
    const updatedStatus = !assignment.isCompleted;
    const updatedAssignment = { ...assignment, isCompleted: updatedStatus };
    setAssignment(updatedAssignment);

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const list: Assignment[] = JSON.parse(stored);
        const updatedList = list.map(item =>
          item.id === assignment.id ? updatedAssignment : item,
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      }
      Alert.alert(
        'Thông báo',
        `Đã chuyển trạng thái sang "${updatedStatus ? 'Đã hoàn thành' : 'Chưa hoàn thành'}"`,
      );
    } catch (e) {
      console.error('Lỗi khi cập nhật trạng thái bài tập:', e);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Thẻ Bài tập - Phong cách phẳng tối giản */}
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.statusBadge,
            assignment.isCompleted ? styles.badgeDone : styles.badgePending,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              assignment.isCompleted ? styles.textDone : styles.textPending,
            ]}
          >
            {assignment.isCompleted ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
          </Text>
        </View>
        <Text style={styles.title}>{assignment.title}</Text>
        <Text style={styles.subjectName}>{assignment.subjectName}</Text>
      </View>

      {/* Thông tin hạn nộp */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin nộp bài</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hạn nộp</Text>
          <Text style={styles.dueDateText}>{assignment.dueDate}</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Mã bài tập</Text>
          <Text style={styles.infoValue}>{assignment.id}</Text>
        </View>
      </View>

      {/* Chi tiết yêu cầu */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yêu cầu bài tập</Text>
        <Text style={styles.descriptionText}>{assignment.description}</Text>
      </View>

      {/* Nút Cập nhật trạng thái */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          assignment.isCompleted ? styles.btnUndo : styles.btnComplete,
        ]}
        activeOpacity={0.8}
        onPress={toggleStatus}
      >
        <Text
          style={[
            styles.actionButtonText,
            assignment.isCompleted && styles.btnUndoText,
          ]}
        >
          {assignment.isCompleted
            ? 'Đánh dấu chưa hoàn thành'
            : 'Đánh dấu đã hoàn thành'}
        </Text>
      </TouchableOpacity>

      {/* Nút quay lại trung tính nhẹ nhàng */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại danh sách</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

