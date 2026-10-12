import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockSchedules } from '../../data/mocData';
import { ScheduleItem } from '../../types';
import { scheduleStyles as styles } from '../../styles/scheduleStyles';
import { ScheduleCard, EmptyState, DayFilter } from '../../components';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DAYS = ['Tất cả', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export function ScheduleScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDay, setSelectedDay] = useState('Tất cả');

  const filteredSchedule = mockSchedules.filter(item => {
    if (selectedDay === 'Tất cả') return true;
    return item.dayOfWeek === selectedDay;
  });

  const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
    <ScheduleCard
      scheduleItem={item}
      onPress={() => navigation.navigate('ScheduleDetails', { scheduleItem: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* THANH CHỌN THỨ TRONG TUẦN */}
      <DayFilter
        days={DAYS}
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      {/* DANH SÁCH BUỔI HỌC */}
      <FlatList
        data={filteredSchedule}
        keyExtractor={item => item.id}
        renderItem={renderScheduleItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="Hôm nay bạn không có lịch học!"
            subtitle="Hãy tận hưởng thời gian nghỉ ngơi nhé."
          />
        }
      />
    </SafeAreaView>
  );
}