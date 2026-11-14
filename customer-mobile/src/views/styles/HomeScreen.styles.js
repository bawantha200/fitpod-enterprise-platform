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
    paddingBottom: 24,
  },

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
  
    welcomeRow: {
      minHeight: 70,
      paddingTop: 10,
      paddingBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
  
    welcomeEyebrow: {
      color: MUTED,
      fontSize: 12,
      lineHeight: 17,
    },
  
    welcomeName: {
      color: WHITE,
      fontSize: 22,
      fontWeight: '700',
      lineHeight: 31,
    },
  
    tag: {
      borderWidth: 1,
      borderColor: GREEN,
      borderRadius: 20,
      paddingHorizontal: 9,
      paddingVertical: 5,
    },
  
    tagText: {
      color: GREEN,
      fontSize: 9,
      fontWeight: '600',
    },
  
    banner: {
      height: 102,
      borderRadius: 16,
      backgroundColor: '#252B18',
      padding: 14,
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
  
    bannerOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.22)',
    },
  
    bannerTitle: {
      width: 220,
      color: WHITE,
      fontSize: 19,
      fontWeight: '700',
      lineHeight: 25,
    },
  
    podSection: {
      paddingTop: 17,
      paddingBottom: 2,
      gap: 4,
    },
  
    podTitle: {
      color: WHITE,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 23,
    },
  
    podDescription: {
      color: MUTED,
      fontSize: 10,
      lineHeight: 15,
    },
  
    podPriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 2,
    },
  
    podPrice: {
      color: GREEN,
      fontSize: 12,
      fontWeight: '600',
    },
  
    sampleRate: {
      color: MUTED,
      fontSize: 9,
    },
  
    bookingCard: {
      marginTop: 18,
      padding: 14,
      borderRadius: 18,
      backgroundColor: CARD,
      gap: 10,
    },
  
    cardHeadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 1,
    },
  
    bookingTitle: {
      color: WHITE,
      fontSize: 19,
      fontWeight: '700',
      lineHeight: 27,
    },
  
    twoColumns: {
      flexDirection: 'row',
      gap: 10,
    },
  
    fieldColumn: {
      flex: 1,
      gap: 7,
    },
  
    fieldLabel: {
      color: MUTED,
      fontSize: 11,
      lineHeight: 15,
    },
  
    fieldBox: {
      minHeight: 44,
      backgroundColor: BACKGROUND,
      borderWidth: 1,
      borderColor: BORDER,
      borderRadius: 10,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 6,
    },
  
    invalidField: {
      borderColor: '#D9534F',
    },
  
    fieldValue: {
      color: WHITE,
      fontSize: 12,
      fontWeight: '500',
    },
  
    fieldGroup: {
      gap: 5,
    },
  
    segmentRow: {
      flexDirection: 'row',
      gap: 4,
      padding: 4,
      backgroundColor: CARD,
      borderRadius: 12,
    },
  
    segment: {
      flex: 1,
      minHeight: 34,
      paddingHorizontal: 5,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: CARD,
    },
  
    segmentSelected: {
      backgroundColor: GREEN,
    },
  
    segmentText: {
      color: MUTED,
      fontSize: 11,
      fontWeight: '600',
    },
  
    segmentTextSelected: {
      color: BACKGROUND,
    },
  
    timeSlotContainer: {
      backgroundColor: BACKGROUND,
      borderRadius: 12,
      padding: 12,
      gap: 10,
    },
  
    timeSlotGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 8,
    },
  
    timeSlot: {
      width: '31%',
      minHeight: 42,
      borderWidth: 1,
      borderColor: BORDER,
      borderRadius: 9,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: CARD,
    },
  
    timeSlotSelected: {
      backgroundColor: GREEN,
      borderColor: GREEN,
    },
  
    timeSlotText: {
      color: WHITE,
      fontSize: 11,
      fontWeight: '600',
    },
  
    timeSlotSelectedText: {
      color: BACKGROUND,
    },
  
    slotInfo: {
      color: MUTED,
      fontSize: 10,
      lineHeight: 15,
    },
  
    noSlotsText: {
      color: MUTED,
      fontSize: 11,
      lineHeight: 17,
    },
  
    totalSection: {
      gap: 5,
    },
  
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 1,
    },
  
    totalDuration: {
      color: MUTED,
      fontSize: 12,
      flex: 1,
    },
  
    totalPrice: {
      color: GREEN,
      fontSize: 13,
      fontWeight: '600',
    },
  
    cleaningInfo: {
      color: MUTED,
      fontSize: 10,
      lineHeight: 15,
    },
  
    primaryButton: {
      height: 50,
      backgroundColor: GREEN,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 1,
    },
  
    disabledButton: {
      opacity: 0.5,
    },
  
    primaryButtonText: {
      color: BACKGROUND,
      fontSize: 14,
      fontWeight: '700',
    },
  
    section: {
      marginTop: 24,
      gap: 12,
    },
  
    sectionTitle: {
      color: WHITE,
      fontSize: 19,
      fontWeight: '700',
      lineHeight: 27,
    },
  
    sectionHeadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    viewAll: {
      color: GREEN,
      fontSize: 10,
      fontWeight: '600',
    },
  
    upcomingCard: {
      padding: 16,
      borderRadius: 18,
      backgroundColor: CARD,
      gap: 12,
    },
  
    badgesRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  
    outlineBadge: {
      borderWidth: 1,
      borderColor: GREEN,
      borderRadius: 20,
      paddingHorizontal: 9,
      paddingVertical: 5,
      backgroundColor: BACKGROUND,
    },
  
    outlineBadgeText: {
      color: GREEN,
      fontSize: 10,
      fontWeight: '600',
    },
  
    upcomingTitle: {
      color: WHITE,
      fontSize: 16,
      fontWeight: '600',
    },
  
    upcomingDate: {
      color: MUTED,
      fontSize: 13,
      lineHeight: 20,
    },
  
    upcomingMetaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    upcomingMeta: {
      color: MUTED,
      fontSize: 12,
    },
  
    upcomingAmount: {
      color: WHITE,
      fontSize: 13,
      fontWeight: '500',
    },
  
    bookingReference: {
      color: MUTED,
      fontSize: 11,
    },
  
    secondaryButton: {
      height: 50,
      borderWidth: 1,
      borderColor: BORDER,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    secondaryButtonText: {
      color: WHITE,
      fontSize: 14,
      fontWeight: '700',
    },
  
    cafeRow: {
      flexDirection: 'row',
      gap: 12,
    },
  
    cafeItem: {
      flex: 1,
      gap: 7,
    },
  
    cafeImage: {
      height: 130,
      borderRadius: 14,
      backgroundColor: '#242424',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    cafeEmoji: {
      fontSize: 43,
    },
  
    cafeName: {
      color: WHITE,
      fontSize: 14,
      fontWeight: '600',
    },
  
    cafePrice: {
      color: GREEN,
      fontSize: 12,
    },
  
    assistantCard: {
      marginTop: 24,
      padding: 16,
      borderRadius: 18,
      backgroundColor: CARD,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
  
    assistantIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#252D16',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    assistantTextWrap: {
      flex: 1,
      gap: 5,
    },
  
    assistantTitle: {
      color: WHITE,
      fontSize: 16,
      fontWeight: '700',
    },
  
    assistantDescription: {
      color: MUTED,
      fontSize: 12,
      lineHeight: 18,
    },
  
    updateCard: {
      padding: 16,
      borderRadius: 18,
      backgroundColor: CARD,
      gap: 8,
    },
  
    updateEyebrow: {
      color: GREEN,
      fontSize: 10,
      lineHeight: 14,
    },
  
    updateTitle: {
      color: WHITE,
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
    },
  
    updateDescription: {
      color: MUTED,
      fontSize: 13,
      lineHeight: 19,
    },
  
    connectionStatus: {
      color: MUTED,
      fontSize: 10,
      textAlign: 'center',
      marginTop: 20,
    },
  
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
  
    navLabel: {
      color: WHITE,
      fontSize: 10,
      fontWeight: '400',
    },
  
    navLabelActive: {
      color: GREEN,
      fontWeight: '600',
    },
    
});

export default styles;