import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1D1D1D',
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  headerRight: {
    width: 38,
    alignItems: 'flex-end',
  },

  pageTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    marginTop: 25,
  },

  pageDescription: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 22,
  },

  summaryCard: {
    backgroundColor: '#171717',
    borderRadius: 17,
    padding: 17,
    marginBottom: 16,
  },

  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  groupTag: {
    backgroundColor: '#252D0D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  groupTagText: {
    color: '#B6FF00',
    fontSize: 10,
    fontWeight: '800',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  summaryLabel: {
    color: '#888888',
    fontSize: 13,
  },

  summaryValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#303030',
    marginVertical: 13,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  totalLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  totalPrice: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  shareLabel: {
    color: '#B6FF00',
    fontSize: 12,
    flex: 1,
  },

  sharePrice: {
    color: '#B6FF00',
    fontSize: 15,
    fontWeight: '800',
  },

  walletCard: {
    backgroundColor: '#171717',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  walletIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#252D0D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletDetails: {
    flex: 1,
    marginLeft: 12,
  },

  walletTitle: {
    color: '#999999',
    fontSize: 12,
  },

  walletAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 4,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  availableBadge: {
    backgroundColor: '#26300D',
  },

  unavailableBadge: {
    backgroundColor: '#351919',
  },

  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },

  availableText: {
    color: '#B6FF00',
  },

  unavailableText: {
    color: '#FF5A5A',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },

  sectionSubtitle: {
    color: '#777777',
    fontSize: 11,
    marginTop: 5,
  },

  memberCount: {
    backgroundColor: '#252D0D',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  memberCountText: {
    color: '#B6FF00',
    fontSize: 12,
    fontWeight: '800',
  },

  searchContainer: {
    height: 49,
    backgroundColor: '#171717',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 14,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
  },

  userCard: {
    backgroundColor: '#171717',
    borderRadius: 14,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#B6FF00',
    fontSize: 17,
    fontWeight: '800',
  },

  userDetails: {
    flex: 1,
    marginLeft: 11,
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  userEmail: {
    color: '#888888',
    fontSize: 10,
    marginTop: 3,
  },

  userWallet: {
    color: '#AAAAAA',
    fontSize: 10,
    marginTop: 5,
  },

  userStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },

  userStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },

  addedText: {
    color: '#B6FF00',
    fontSize: 10,
    marginTop: 6,
    fontWeight: '700',
  },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#B6FF00',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  disabledAddButton: {
    backgroundColor: '#303030',
  },

  addedButton: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#252D0D',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  selectedSection: {
    marginTop: 20,
  },

  emptySelected: {
    backgroundColor: '#171717',
    borderRadius: 14,
    padding: 25,
    alignItems: 'center',
    marginTop: 12,
  },

  emptySelectedText: {
    color: '#777777',
    fontSize: 12,
    marginTop: 10,
  },

  selectedCard: {
    backgroundColor: '#171717',
    borderRadius: 14,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#351919',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#171717',
    borderRadius: 14,
  },

  emptyText: {
    color: '#777777',
    marginTop: 10,
    fontSize: 12,
  },

  noticeCard: {
    backgroundColor: '#1B210F',
    borderWidth: 1,
    borderColor: '#394719',
    borderRadius: 13,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 22,
    marginBottom: 20,
  },

  noticeText: {
    flex: 1,
    color: '#C6C6C6',
    fontSize: 11,
    lineHeight: 18,
  },

  primaryButton: {
    height: 54,
    backgroundColor: '#B6FF00',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  primaryButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
  },

  disabledPrimaryButton: {
    backgroundColor: '#555555',
  },

  warningText: {
    color: '#FF5A5A',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 17,
  },

  successContainer: {
    alignItems: 'center',
    paddingTop: 55,
  },

  successIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#252D0D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 22,
  },

  successDescription: {
    color: '#888888',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 28,
  },

  successInfoCard: {
    width: '100%',
    backgroundColor: '#171717',
    borderRadius: 16,
    padding: 18,
  },

  infoLabel: {
    color: '#888888',
    fontSize: 12,
  },

  infoValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 6,
  },

  pendingText: {
    color: '#B6FF00',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
});

export default styles;
