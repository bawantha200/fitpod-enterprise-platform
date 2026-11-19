import { StyleSheet } from 'react-native';

const GREEN = '#B6FF00';
const SHEET = '#151515';
const FIELD = '#202020';
const INPUT = '#0B0B0B';
const BORDER = '#383838';
const MUTED = '#A0A0A0';
const WHITE = '#FFFFFF';
const BLACK = '#000000';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  sheet: {
    backgroundColor: SHEET,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '94%',
  },

  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },

  handle: {
    alignSelf: 'center',
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#5A5A5A',
    marginBottom: 18,
  },

  /* Header */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerTextWrap: {
    flex: 1,
    gap: 3,
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

  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FIELD,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Amount chips */
  sectionLabel: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 20,
    marginBottom: 8,
  },

  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },

  chip: {
    width: '31.4%',
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: FIELD,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chipSelected: {
    borderColor: GREEN,
  },

  chipText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '600',
  },

  chipTextSmall: {
    fontSize: 12,
  },

  /* Amount input */
  inputLabel: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
    marginTop: 18,
    marginBottom: 6,
  },

  inputBox: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: INPUT,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  inputPrefix: {
    color: MUTED,
    fontSize: 18,
    fontWeight: '500',
  },

  input: {
    flex: 1,
    color: WHITE,
    fontSize: 22,
    fontWeight: '600',
    padding: 0,
  },

  inputSuffix: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '500',
  },

  /* Info */
  description: {
    marginTop: 18,
    color: MUTED,
    fontSize: 13,
    lineHeight: 18,
  },

  cardLogosRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardLogo: {
    width: 72,
    height: 46,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  visaLogo: {
    backgroundColor: '#1434CB',
  },

  mastercardLogo: {
    backgroundColor: '#253747',
    flexDirection: 'row',
  },

  amexLogo: {
    backgroundColor: '#2557D6',
  },

  discoverLogo: {
    backgroundColor: '#4D4D4D',
  },

  discoverStripe: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 38,
    backgroundColor: '#F47216',
  },

  logoText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  visaText: {
    fontStyle: 'italic',
    fontSize: 16,
  },

  mcCircleRed: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EB001B',
  },

  mcCircleOrange: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F79E1B',
    marginLeft: -10,
    opacity: 0.95,
  },

  /* Summary */
  summaryBox: {
    marginTop: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: INPUT,
    gap: 2,
  },

  summaryLabel: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 15,
  },

  summaryValue: {
    color: GREEN,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },

  /* Button */
  continueButton: {
    height: 52,
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  continueButtonDisabled: {
    opacity: 0.5,
  },

  continueText: {
    color: BLACK,
    fontSize: 14,
    fontWeight: '700',
  },

  secureText: {
    marginTop: 12,
    color: MUTED,
    fontSize: 11,
    lineHeight: 15,
    textAlign: 'center',
  },
});

export default styles;