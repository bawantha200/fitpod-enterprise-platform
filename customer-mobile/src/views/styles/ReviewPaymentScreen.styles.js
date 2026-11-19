import { StyleSheet } from 'react-native';

const GREEN = '#B6FF00';
const BACKGROUND = '#000000';
const CARD = '#171717';
const DIVIDER = '#333333';
const MUTED = '#A0A0A0';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  logo: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '800',
  },

  logoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
    marginTop: 13,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: -8,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: WHITE,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 31,
  },

  subtitle: {
    marginTop: 16,
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },

  /* Amount card */
  amountCard: {
    marginTop: 24,
    padding: 20,
    borderRadius: 20,
    backgroundColor: GREEN,
    gap: 10,
  },

  amountLabel: {
    color: BACKGROUND,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },

  amountCurrency: {
    color: BACKGROUND,
    fontSize: 25,
    fontWeight: '600',
  },

  amountValue: {
    color: BACKGROUND,
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 53,
  },

  amountMeta: {
    color: BACKGROUND,
    fontSize: 12,
    lineHeight: 17,
  },

  /* Details card */
  detailsCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: CARD,
    gap: 16,
  },

  detailsTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  detailLabel: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
  },

  detailValue: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  divider: {
    height: 1,
    backgroundColor: DIVIDER,
  },

  totalLabel: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },

  totalValue: {
    color: GREEN,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },

  note: {
    marginTop: 20,
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: BACKGROUND,
  },

  confirmButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  confirmButtonDisabled: {
    opacity: 0.6,
  },

  confirmText: {
    color: BACKGROUND,
    fontSize: 14,
    fontWeight: '700',
  },

  footnote: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
});

export default styles;