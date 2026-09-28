import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const listStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  eyebrow: {
    color: colors.teal,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  pageTitle: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  addIconButton: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  addIcon: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 32,
  },
  searchInput: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 15,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  resultCount: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 18,
  },
  listContent: { gap: 10, padding: 20, paddingTop: 10 },
  emptyText: { color: colors.muted, padding: 24, textAlign: 'center' },
});
