import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Student } from '../types/student';
import { getClassification } from '../utils/student';
import { colors } from '../styles/theme';

export function StudentCard({
  student,
  onPress,
}: {
  student: Student;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
      </View>
      <View style={styles.summary}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.meta}>
          {student.id} • {student.className}
        </Text>
      </View>
      <View style={styles.gpaBox}>
        <Text style={styles.gpa}>{student.gpa}</Text>
        <Text style={styles.classification}>
          {getClassification(student.gpa)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'row',
    padding: 14,
  },
  pressed: { opacity: 0.72 },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.paleTeal,
    borderRadius: 14,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  avatarText: { color: colors.teal, fontSize: 20, fontWeight: '800' },
  summary: { flex: 1, marginLeft: 12 },
  name: { color: colors.ink, fontSize: 16, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 6 },
  gpaBox: { alignItems: 'flex-end' },
  gpa: { color: colors.teal, fontSize: 18, fontWeight: '800' },
  classification: { color: colors.muted, fontSize: 11, marginTop: 3 },
});
