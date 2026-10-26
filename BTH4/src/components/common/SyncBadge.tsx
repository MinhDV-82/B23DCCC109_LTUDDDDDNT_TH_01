import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function SyncBadge({ pending }: { pending?: boolean }) {
  if (!pending) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Chưa đồng bộ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  text: {
    ...typography.captionBold,
    color: '#B45309',
    fontSize: 11,
  },
});
