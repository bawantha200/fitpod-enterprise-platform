import { StyleSheet } from 'react-native';

const GREEN = '#B6FF00';
const BACKGROUND = '#000000';
const CARD = '#171717';
const BORDER = '#303030';
const MUTED = '#A0A0A0';
const WHITE = '#FFFFFF';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  screen: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },

  /* Header */
  header: {
    height: 60,
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

  headerButton: {
    width: 26,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Greeting */
  greeting: {
    paddingTop: 10,
    paddingBottom: 16,
    gap: 5,
  },

  title: {
    color: WHITE,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 36,
  },

  subtitle: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
  },

  /* Balance */
  balanceCard: {
    padding: 22,
    borderRadius: 20,
    backgroundColor: GREEN,
    gap: 12,
  },

  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  balanceLabel: {
    color: BACKGROUND,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },

  balanceAmount: {
    color: BACKGROUND,
    fontSize: 39,
    fontWeight: '700',
    lineHeight: 52,
  },

  balanceMeta: {
    color: BACKGROUND,
    fontSize: 11,
    lineHeight: 15,
  },

  addMoneyButton: {
    height: 50,
    marginTop: 16,
    backgroundColor: GREEN,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  addMoneyText: {
    color: BACKGROUND,
    fontSize: 14,
    fontWeight: '700',
  },

  /* Transactions */
  sectionHeadingRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
  },

  viewAll: {
    color: GREEN,
    fontSize: 11,
  },

  transactionsCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: CARD,
    gap: 16,
  },

  transaction: {
    gap: 6,
  },

  transactionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  transactionIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  transactionTextWrap: {
    flex: 1,
    gap: 2,
  },

  transactionTitle: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },

  transactionDate: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 14,
  },

  amountDebit: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
  },

  amountCredit: {
    color: GREEN,
    fontSize: 13,
    fontWeight: '600',
  },

  transactionReference: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 14,
  },

  balanceAfterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  balanceAfterLabel: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
  },

  balanceAfterValue: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: BORDER,
  },

  openingBalance: {
    marginTop: 16,
    color: MUTED,
    fontSize: 11,
    lineHeight: 15,
  },

});

export default styles;