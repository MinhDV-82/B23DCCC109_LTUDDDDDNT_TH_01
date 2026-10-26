import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { sessionService } from '../../api/sessionService';
import { CACHE_KEYS } from '../../storage/keys';
import { useCachedQuery } from '../../hooks/useCachedQuery';
import { Session } from '../../types';
import { ScheduleCard, EmptyState } from '../../components';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DAY_OPTIONS = [
  { label: 'Tất cả', value: 0 },
  { label: 'Thứ 2', value: 2 },
  { label: 'Thứ 3', value: 3 },
  { label: 'Thứ 4', value: 4 },
  { label: 'Thứ 5', value: 5 },
  { label: 'Thứ 6', value: 6 },
  { label: 'Thứ 7', value: 7 },
  { label: 'Chủ nhật', value: 8 },
];

export function ScheduleScreen() {
  const navigation = useNavigation<NavigationProp>();

  const todayVal = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 ? 8 : day + 1;
  }, []);

  const [selectedDay, setSelectedDay] = useState<number>(todayVal);

  const {
    data: sessions,
    loading,
    error,
    refreshing,
    refresh,
    lastUpdated,
  } = useCachedQuery<Session[]>(CACHE_KEYS.SESSIONS, sessionService.getAll);

  const filteredSessions = useMemo(() => {
    if (!sessions) return [];
    if (selectedDay === 0) return sessions;
    return sessions.filter((s) => Number(s.dayOfWeek) === selectedDay);
  }, [sessions, selectedDay]);

  if (loading && (!sessions || sessions.length === 0)) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải lịch học..." />
      </ScreenContainer>
    );
  }

  if (error && (!sessions || sessions.length === 0)) {
    return (
      <ScreenContainer>
        <ErrorView message={error} onRetry={refresh} />
      </ScreenContainer>
    );
  }

  const renderSessionItem = ({ item }: { item: Session }) => (
    <ScheduleCard
      scheduleItem={item}
      onPress={() =>
        navigation.navigate(ROUTES.SCHEDULE_DETAILS, { id: item.id })
      }
    />
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.selectorWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectorList}
          >
            {DAY_OPTIONS.map((opt) => {
              const isSelected = selectedDay === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.dayChip,
                    isSelected && styles.dayChipActive,
                  ]}
                  onPress={() => setSelectedDay(opt.value)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.dayChipText,
                      isSelected && styles.dayChipTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <LastUpdatedText timestamp={lastUpdated} />

        <FlatList
          data={filteredSessions}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderSessionItem}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={refresh}
          ListEmptyComponent={
            <EmptyState
              title="Không có lịch học trong ngày này!"
              description="Hãy tận hưởng thời gian nghỉ ngơi hoặc chọn ngày khác nhé."
            />
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectorWrapper: {
    backgroundColor: colors.card,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectorList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  dayChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 20,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayChipText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  dayChipTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
});
