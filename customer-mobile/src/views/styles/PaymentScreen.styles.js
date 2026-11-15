import { StyleSheet } from 'react-native';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';
const GREY = '#999999';
const CARD = '#171717';
const MUTED = '#929292';
const BACKGROUND = '#000000';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },

  // Header
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#242424',
  },

  backButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },

  logoText: {
    color: GREEN,
    fontSize: 17,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: MUTED,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 25,
  },

  stepText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 12,
  },

  mainTitle: {
    color: WHITE,
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 8,
  },

  subtitle: {
    color: GREY,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 27,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    color: GREY,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },

  summaryCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 17,
  },

  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  podIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#292F1B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  podIconText: {
    color: GREEN,
    fontSize: 14,
    fontWeight: '800',
  },

  podInfo: {
    flex: 1,
  },

  podName: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },

  bookingType: {
    color: GREY,
    fontSize: 11,
  },

  summaryDivider: {
    height: 1,
    backgroundColor: '#303030',
    marginVertical: 16,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailLabelText: {
    color: GREY,
    fontSize: 12,
    marginLeft: 8,
  },

  detailValue: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '600',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },

  priceLabel: {
    color: GREY,
    fontSize: 12,
  },

  priceValue: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  totalAmount: {
    color: GREEN,
    fontSize: 20,
    fontWeight: '800',
  },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#292929',
    borderRadius: 14,
    padding: 15,
    marginBottom: 11,
  },

  selectedPaymentOption: {
    borderColor: GREEN,
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  paymentInfo: {
    flex: 1,
  },

  paymentTitle: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
  },

  paymentDescription: {
    color: GREY,
    fontSize: 11,
  },

  insufficientText: {
    color: '#FF6B6B',
    fontSize: 10,
    marginTop: 5,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#777777',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterSelected: {
    borderColor: GREEN,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN,
  },

  remainingBalanceCard: {
    backgroundColor: '#202719',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },

  remainingLabel: {
    color: GREY,
    fontSize: 11,
  },

  remainingAmount: {
    color: GREEN,
    fontSize: 14,
    fontWeight: '700',
  },

  holdCard: {
    flexDirection: 'row',
    backgroundColor: '#202719',
    borderRadius: 13,
    padding: 15,
    marginBottom: 22,
  },

  holdIcon: {
    marginRight: 12,
    paddingTop: 2,
  },

  holdInfo: {
    flex: 1,
  },

  holdTitle: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },

  holdDescription: {
    color: GREY,
    fontSize: 11,
    lineHeight: 17,
  },

  confirmButton: {
    height: 50,
    backgroundColor: GREEN,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  // Bottom continue button
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: BACKGROUND,
  },

  confirmButtonDisabled: {
    opacity: 0.45,
  },

  confirmButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },

  disclaimer: {
    color: GREY,
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 12,
  },

  bottomNavigation: {
    height: 62,
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#252525',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },

  navText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '400',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navLabel: {
    color: GREY,
    fontSize: 10,
    fontWeight: '500',
  },

  navLabelActive: {
    color: GREEN,
    fontWeight: '700',
  },
});

export default styles;
