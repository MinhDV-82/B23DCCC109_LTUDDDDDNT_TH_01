import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { scheduleDetailStyles as styles } from '../../styles/scheduleDetailStyles';
import { InfoRow } from '../../components';

type ScreenRouteProp = RouteProp<RootStackParamList, 'ScheduleDetails'>;

export function ScheduleDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation();
  const { scheduleItem } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Thời gian */}
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{scheduleItem.dayOfWeek}</Text>
        </View>
        <Text style={styles.timeText}>{scheduleItem.time}</Text>
        <Text style={styles.subjectName}>{scheduleItem.subjectName}</Text>
      </View>

      {/* Thông tin buổi học */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin buổi học</Text>
        <InfoRow label="Phòng học" value={scheduleItem.room} />
        <InfoRow label="Giảng viên" value={scheduleItem.lecturer} />
        <InfoRow label="Mã môn học" value={scheduleItem.subjectId} isLast />
      </View>

      {/* Nội dung bài học */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nội dung dự kiến</Text>
        <Text style={styles.descriptionText}>
          {scheduleItem.lessonContent || 'Theo lịch trình giảng dạy của giảng viên bộ môn.'}
        </Text>
      </View>

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Quay lại thời khóa biểu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}