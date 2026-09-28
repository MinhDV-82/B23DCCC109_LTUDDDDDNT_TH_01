import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const detailStyles = StyleSheet.create({
  content: { padding: 20 },
  profileHero: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
  },
  largeAvatar: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  largeAvatarText: { color: colors.white, fontSize: 34, fontWeight: '800' },
  name: {
    color: colors.teal,
    fontSize: 23,
    fontWeight: '800',
    marginTop: 14,
    textAlign: 'center',
  },
  className: { color: colors.ink, fontSize: 13, marginTop: 6 },
  scorePill: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  scoreText: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  infoPanel: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  infoRow: {
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  infoLabel: { color: colors.muted, fontSize: 13 },
  infoValue: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
    textAlign: 'right',
  },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
});
