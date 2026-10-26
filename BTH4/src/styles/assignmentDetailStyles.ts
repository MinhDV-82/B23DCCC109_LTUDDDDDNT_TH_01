import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const assignmentDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  cardHeader: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  badgePending: {
    backgroundColor: '#F1F5F9',
  },
  badgeDone: {
    backgroundColor: colors.primaryLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  textPending: {
    color: colors.textBody,
  },
  textDone: {
    color: colors.primary,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textTitle,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 6,
  },
  subjectName: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textTitle,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textTitle,
  },
  dueDateText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textTitle,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textBody,
    lineHeight: 22,
  },
  actionButton: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnComplete: {
    backgroundColor: colors.primary,
  },
  btnUndo: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  btnUndoText: {
    color: colors.textBody,
  },
  backButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.textBody,
    fontSize: 14,
    fontWeight: '600',
  },
});
