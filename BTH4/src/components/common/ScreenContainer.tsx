import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import OfflineBanner from './OfflineBanner';
import colors from '../../theme/colors';

interface ScreenContainerProps {
  children: ReactNode;
  scroll?: boolean;
  refreshControl?: React.ReactElement;
}

export default function ScreenContainer({
  children,
  scroll = false,
  refreshControl,
}: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.container}>
      <OfflineBanner />
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});
