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
    paddingTop: 36,
    paddingBottom: 24,
    alignItems: 'center',
  },

  badgeOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#1C2B00',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginTop: 28,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 39,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 7,
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  /* Receipt */
  receiptCard: {
    alignSelf: 'stretch',
    marginTop: 36,
    padding: 18,
    borderRadius: 20,
    backgroundColor: CARD,
    gap: 16,
  },

  receiptLabelSmall: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15,
  },

  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: -6,
  },

  amountCurrency: {
    color: GREEN,
    fontSize: 25,
    fontWeight: '600',
  },

  amountValue: {
    color: GREEN,
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 50,
  },

  divider: {
    height: 1,
    backgroundColor: DIVIDER,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rowLabel: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
  },

  rowValue: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },

  rowValueSuccess: {
    color: GREEN,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  balanceLabel: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 17,
  },

  balanceValue: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },

  /* Footer */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 12,
    backgroundColor: BACKGROUND,
  },

  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
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