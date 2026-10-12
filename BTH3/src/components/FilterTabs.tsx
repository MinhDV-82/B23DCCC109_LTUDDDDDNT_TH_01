import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export interface FilterTabOption<T extends string> {
  key: T;
  label: string;
}

export interface FilterTabsProps<T extends string> {
  options: FilterTabOption<T>[];
  selected: T;
  onSelect: (key: T) => void;
}

export function FilterTabs<T extends string>({
  options,
  selected,
  onSelect,
}: FilterTabsProps<T>) {
  return (
    <View style={styles.filterWrapper}>
      <View style={styles.filterContainer}>
        {options.map(option => {
          const isActive = selected === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => onSelect(option.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterTabText,
                  isActive && styles.filterTabTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 3,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
  },
  filterTabActive: {
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTabTextActive: {
    fontWeight: '700',
    color: colors.primary,
  },
});

