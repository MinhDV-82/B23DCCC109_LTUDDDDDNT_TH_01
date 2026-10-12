import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { subjectDetailStyles as styles } from '../../styles/subjectDetailStyles';
import { InfoRow } from '../../components';

type ScreenRouteProp = RouteProp<RootStackParamList, 'SubjectDetails'>;

export function SubjectDetailScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation();
  const { subject } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Thẻ Môn học */}
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{subject.id}</Text>
        </View>
        <Text style={styles.title}>{subject.name}</Text>
        <Text style={styles.credits}>{subject.credits} Tín chỉ</Text>
      </View>

      {/* Thông tin chi tiết */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin lớp học</Text>
        <InfoRow label="Giảng viên phụ trách" value={subject.lecturer} />
        <InfoRow label="Phòng học" value={subject.room} />
        <InfoRow label="Mã học phần" value={subject.id} isLast />
      </View>

      {/* Đề cương mô tả */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mô tả môn học</Text>
        <Text style={styles.descriptionText}>{subject.description}</Text>
      </View>

      {/* Nút quay lại */}
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