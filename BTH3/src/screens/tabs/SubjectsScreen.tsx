import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockSubjects } from '../../data/mocData';
import { Subject } from '../../types';
import { subjectsStyles as styles } from '../../styles/subjectsStyles';
import { SubjectCard, EmptyState } from '../../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function SubjectsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  // Lọc môn học theo tên hoặc mã môn học
  const filteredSubjects = mockSubjects.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <SubjectCard
      subject={item}
      variant="full"
      onPress={() => navigation.navigate('SubjectDetails', { subject: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* THANH TÌM KIẾM */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm môn học theo tên hoặc mã..."
          placeholderTextColor="#95a5a6"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* DANH SÁCH FLATLIST */}
      <FlatList
        data={filteredSubjects}
        keyExtractor={item => item.id}
        renderItem={renderSubjectItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="Không tìm thấy môn học nào"
            subtitle="Thử tìm kiếm với từ khóa khác xem sao bạn nhé!"
          />
        }
      />
    </SafeAreaView>
  );
}