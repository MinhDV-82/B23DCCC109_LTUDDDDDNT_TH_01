import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const formStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { gap: 4, padding: 20, paddingBottom: 36 },
  intro: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 14,
  },
  fieldLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 11,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  genderRow: { flexDirection: 'row', gap: 8 },
  genderButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 12,
  },
  genderButtonActive: {
    backgroundColor: colors.paleTeal,
    borderColor: colors.teal,
  },
  genderText: {
    color: colors.muted,
    fontWeight: '600',
  },
  genderTextActive: {
    color: colors.teal,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 12,
  },
});
