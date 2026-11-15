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

  logoText: {
    color: GREEN,
    fontSize: 17,
    fontWeight: '800',
  },

  headerLeft: {
    width: 30,
    height: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerSubtitle: {
    color: MUTED,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },

  headerTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  // Introduction
  intro: {
    paddingTop: 14,
    paddingBottom: 18,
    gap: 5,
  },

  stepText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  mainTitle: {
    color: WHITE,
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 34,
  },

  sectionHint: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
  },

  // Cards
  card: {
    padding: 15,
    borderRadius: 18,
    backgroundColor: CARD,
    gap: 13,
  },

  // Section
  section: {
    marginTop: 24,
    gap: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  sectionTitle: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },

  // Calendar
  selectedDateContainer: {
    marginTop: 15,
    gap: 7,
  },

  fieldLabel: {
    color: MUTED,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  dateInput: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: BACKGROUND,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputValue: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '500',
  },

  // Time slots
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 9,
  },

  timeSlot: {
    width: '31%',
    minHeight: 43,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedTimeSlot: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  timeSlotText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '600',
  },

  selectedTimeSlotText: {
    color: BACKGROUND,
  },

  emptyText: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
  },

  // Duration and booking type
  optionContainer: {
    flexDirection: 'row',
    gap: 7,
  },

  option: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookingTypeOption: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeOption: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  optionText: {
    color: MUTED,
    fontSize: 11,
    fontWeight: '600',
  },

  activeOptionText: {
    color: BACKGROUND,
  },

  // Pod availability
  podHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  podTitle: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },

  podDescription: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },

  infoCard: {
    padding: 15,
    borderRadius: 14,
    backgroundColor: CARD,
    gap: 12,
  },

  infoContent: {
    gap: 10,
  },

  infoTitle: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '700',
  },

  infoDescription: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
  },

  occupancyBar: {
    height: 9,
    flexDirection: 'row',
    gap: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },

  occupancySegment: {
    flex: 1,
    backgroundColor: '#353535',
    borderRadius: 5,
  },

  bookedSegment: {
    backgroundColor: GREEN,
  },

  occupancyLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  occupancyTime: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '600',
  },

  occupancyDescription: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 15,
  },

  // Price summary
  priceDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 5,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  priceLabel: {
    color: MUTED,
    fontSize: 12,
  },

  priceValue: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '500',
  },

  totalPrice: {
    color: GREEN,
    fontSize: 14,
    fontWeight: '700',
  },

  // Bottom continue button
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: BACKGROUND,
  },

  continueButton: {
    height: 50,
    backgroundColor: GREEN,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  disabledButton: {
    opacity: 0.5,
  },

  continueText: {
    color: BACKGROUND,
    fontSize: 14,
    fontWeight: '700',
  },

  // Bottom navigation - same design as HomeScreen
  bottomNavigation: {
    height: 62,
    backgroundColor: BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
  },

  navItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  navText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '400',
  },

  activeNavText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default styles;
