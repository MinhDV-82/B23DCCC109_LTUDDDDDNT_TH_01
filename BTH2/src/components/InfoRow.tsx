import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/theme';

export function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  label: { color: colors.muted, fontSize: 13 },
  value: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
    textAlign: 'right',
  },
});
