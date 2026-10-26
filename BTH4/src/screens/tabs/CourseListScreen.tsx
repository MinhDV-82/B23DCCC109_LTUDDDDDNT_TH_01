import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ROUTES } from '../../navigation/routes';
import { courseService } from '../../api/courseService';
import { CACHE_KEYS } from '../../storage/keys';
import { useCachedQuery } from '../../hooks/useCachedQuery';
import { Course } from '../../types';
import { CourseCard, EmptyState } from '../../components';
import ScreenContainer from '../../components/common/ScreenContainer';
import LoadingView from '../../components/common/LoadingView';
import ErrorView from '../../components/common/ErrorView';
import LastUpdatedText from '../../components/common/LastUpdatedText';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function CourseListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('Tất cả');

  const {
    data: courses,
    loading,
    error,
    refreshing,
    refresh,
    lastUpdated,
  } = useCachedQuery<Course[]>(CACHE_KEYS.COURSES, courseService.getAll);

  const semesters = useMemo(() => {
    if (!courses) return ['Tất cả'];
    const unique = Array.from(new Set(courses.map((c) => c.semester).filter(Boolean)));
    return ['Tất cả', ...unique];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSemester =
        selectedSemester === 'Tất cả' || item.semester === selectedSemester;

      return matchSearch && matchSemester;
    });
  }, [courses, searchQuery, selectedSemester]);

  if (loading && (!courses || courses.length === 0)) {
    return (
      <ScreenContainer>
        <LoadingView message="Đang tải danh sách môn học..." />
      </ScreenContainer>
    );
  }

  if (error && (!courses || courses.length === 0)) {
    return (
      <ScreenContainer>
        <ErrorView message={error} onRetry={refresh} />
      </ScreenContainer>
    );
  }

  const renderCourseItem = ({ item }: { item: Course }) => (
    <CourseCard
      course={item}
      variant="full"
      onPress={() =>
        navigation.navigate(ROUTES.COURSE_DETAIL, { id: item.id })
      }
    />
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên hoặc mã môn..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
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

        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          >
            {semesters.map((sem) => {
              const isSelected = selectedSemester === sem;
              return (
                <TouchableOpacity
                  key={sem}
                  style={[
                    styles.filterChip,
                    isSelected && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedSemester(sem)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.filterChipTextActive,
                    ]}
                  >
                    {sem}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <LastUpdatedText timestamp={lastUpdated} />

        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCourseItem}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={refresh}
          ListEmptyComponent={
            <EmptyState
              title="Không tìm thấy môn học nào"
              description="Thử tìm kiếm với từ khóa khác hoặc chọn học kỳ khác."
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    height: 44,
    ...typography.body,
    color: colors.text,
  },
  clearButton: {
    padding: spacing.xs,
  },
  clearText: {
    color: colors.textMuted,
    fontSize: 16,
  },
  filterWrapper: {
    marginVertical: spacing.xs,
  },
  filterList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.captionBold,
    color: colors.textMuted,
  },
  filterChipTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
});
export default CourseListScreen;

