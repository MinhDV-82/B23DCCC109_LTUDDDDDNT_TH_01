import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const scheduleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  dayFilterContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 10,
  },
  filterList: {
    paddingHorizontal: 12,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 4,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textBody,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  timeBadge: {
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 90,
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  timeText: {
    fontSize: 11,
    color: colors.primaryDark,
    marginTop: 2,
    fontWeight: '600',
  },
  infoContainer: {
    flex: 1,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'column',
    gap: 2,
  },
  roomText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  lecturerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#CBD5E1',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 6,
  },
});
