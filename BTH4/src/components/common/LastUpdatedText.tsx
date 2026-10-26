import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { formatLastUpdated } from '../../utils/date';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import typography from '../../theme/typography';

export default function LastUpdatedText({ timestamp }: { timestamp?: string | null }) {
  const { isOnline } = useNetworkStatus();

  if (isOnline || !timestamp) return null;

  return (
    <Text style={styles.text}>
      {formatLastUpdated(timestamp)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: spacing.xs,
    fontStyle: 'italic',
  },
});
