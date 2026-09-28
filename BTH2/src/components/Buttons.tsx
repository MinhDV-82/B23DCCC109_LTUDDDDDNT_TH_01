import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/theme';

export function PrimaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.primary}>
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  title,
  onPress,
  danger = false,
}: {
  title: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.secondary, danger && styles.dangerButton]}
    >
      <Text style={[styles.secondaryText, danger && styles.dangerText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 18,
  },
  primaryText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  secondary: {
    alignItems: 'center',
    backgroundColor: colors.paleTeal,
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 18,
  },
  secondaryText: { color: colors.teal, fontSize: 15, fontWeight: '800' },
  dangerButton: { backgroundColor: colors.white, borderColor: colors.danger, borderWidth: 1 },
  dangerText: { color: colors.danger },
});
