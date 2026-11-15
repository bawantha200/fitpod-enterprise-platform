import { StyleSheet } from 'react-native';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';
const BLACK = '#000000';
const CARD = '#171717';
const MUTED = '#929292';

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: BLACK,
  },

  screen: {
    flex: 1,
    backgroundColor: BLACK,
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

  headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },

  headerTitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },

  headerSubtitle: {
    color: MUTED,
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 3,
  },

  notificationButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // Scroll
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },

  // Intro
  intro: {
    marginBottom: 20,
  },

  stepText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },

  mainTitle: {
    color: WHITE,
    fontSize: 29,
    fontWeight: '700',
    marginBottom: 8,
  },

  sectionHint: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 20,
  },

  // Availability
  availabilitySummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  availabilityDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GREEN,
    marginRight: 8,
  },

  availabilityText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '600',
  },

  // Pod List
  podList: {
    gap: 16,
  },

  podCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#292929',
    overflow: 'hidden',
  },

  selectedPodCard: {
    borderColor: GREEN,
    borderWidth: 1.5,
  },

  unavailablePodCard: {
    opacity: 0.55,
  },

  // Pod Image
  podImageArea: {
    height: 175,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  podImageIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18210B',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  unavailableBadge: {
    backgroundColor: '#302020',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
    marginRight: 6,
  },

  unavailableDot: {
    backgroundColor: '#FF6464',
  },

  statusText: {
    color: WHITE,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },

  selectedIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  // Pod Information
  podInfo: {
    padding: 17,
  },

  podTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  podTitleContainer: {
    flex: 1,
  },

  podName: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 23,
  },

  podId: {
    color: MUTED,
    fontSize: 10,
    marginTop: 5,
    letterSpacing: 1,
  },

  podDescription: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 10,
  },

  // Capacity
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
    gap: 9,
  },

  capacityText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '500',
  },

  // Equipment
  equipmentTitle: {
    color: MUTED,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 22,
    marginBottom: 10,
  },

  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  equipmentTag: {
    backgroundColor: '#262626',
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  equipmentText: {
    color: WHITE,
    fontSize: 11,
  },

  // Price
  priceContainer: {
    borderTopWidth: 1,
    borderTopColor: '#303030',
    marginTop: 20,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  priceLabel: {
    color: MUTED,
    fontSize: 12,
  },

  priceValue: {
    color: GREEN,
    fontSize: 13,
    fontWeight: '700',
  },

  // Information Card
  infoCard: {
    backgroundColor: '#151A0E',
    borderWidth: 1,
    borderColor: '#303B1C',
    borderRadius: 14,
    padding: 15,
    flexDirection: 'row',
    marginTop: 22,
    gap: 12,
  },

  infoIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#252F15',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 5,
  },

  infoDescription: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 18,
  },

  bottomSpace: {
    height: 15,
  },

  // Continue Button
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: BLACK,
    borderTopWidth: 1,
    borderTopColor: '#242424',
  },

  continueButton: {
    height: 54,
    backgroundColor: GREEN,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  disabledButton: {
    opacity: 0.4,
  },

  continueText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: '700',
  },

  // Bottom Navigation
  bottomNavigation: {
    height: 65,
    backgroundColor: BLACK,
    borderTopWidth: 1,
    borderTopColor: '#242424',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  navLabel: {
    color: '#858585',
    fontSize: 10,
  },

  navLabelActive: {
    color: GREEN,
    fontWeight: '600',
  },

});

export default styles;
