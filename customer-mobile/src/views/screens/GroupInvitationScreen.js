import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  Search,
  Users,
  UserPlus,
  CheckCircle2,
  XCircle,
  Wallet,
  Clock,
  Trash2,
  Send,
  Check,
} from 'lucide-react-native';

import useGroupInvitationViewModel from '../../viewmodels/useGroupInvitationViewModel';
import styles from '../styles/GroupInvitationScreen.styles';

const GroupInvitationScreen = ({ navigation, route }) => {
  const bookingDetails = route?.params || {};

  const {
    searchQuery,
    setSearchQuery,
    availableUsers,
    selectedMembers,
    totalPrice,
    totalPeople,
    pricePerPerson,
    organizerBalance,
    organizerAvailable,
    allWalletsAvailable,
    invitationsSent,
    canSendInvitations,
    addMember,
    removeMember,
    sendInvitations,
  } = useGroupInvitationViewModel(bookingDetails);

  const handleSendInvitations = () => {
    if (selectedMembers.length === 0) {
      Alert.alert(
        'Add Members',
        'Please add at least one member before sending invitations.'
      );
      return;
    }

    if (!organizerAvailable) {
      Alert.alert(
        'Insufficient Wallet Balance',
        'Your wallet balance is not sufficient for your share.'
      );
      return;
    }

    if (!allWalletsAvailable) {
      Alert.alert(
        'Unavailable Members',
        'One or more members do not have sufficient wallet balance.'
      );
      return;
    }

    const success = sendInvitations();

    if (success) {
      Alert.alert(
        'Invitations Sent',
        'Group invitations have been sent successfully. No wallet deductions have been made.'
      );
    }
  };

  const handleDone = () => {
    navigation.navigate('Home');
  };

  const formatMoney = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString('en-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#FFFFFF" size={22} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Group Booking</Text>

        <View style={styles.headerRight}>
          <Users color="#B6FF00" size={22} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {invitationsSent ? (
          /* Invitation success screen */
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <CheckCircle2 color="#B6FF00" size={52} />
            </View>

            <Text style={styles.successTitle}>
              Invitations Sent!
            </Text>

            <Text style={styles.successDescription}>
              Your group invitations have been sent successfully.
              You can leave this screen while members respond.
            </Text>

            <View style={styles.successInfoCard}>
              <Text style={styles.infoLabel}>Group Members</Text>
              <Text style={styles.infoValue}>
                {totalPeople} People
              </Text>

              <View style={styles.cardDivider} />

              <Text style={styles.infoLabel}>Each Person's Share</Text>
              <Text style={styles.infoValue}>
                {formatMoney(pricePerPerson)}
              </Text>

              <View style={styles.cardDivider} />

              <Text style={styles.infoLabel}>Payment Status</Text>
              <Text style={styles.pendingText}>
                Pending Acceptance
              </Text>
            </View>

            <View style={styles.noticeCard}>
              <CheckCircle2 color="#B6FF00" size={19} />

              <Text style={styles.noticeText}>
                No money has been deducted from any wallet.
                Payment will be processed automatically after
                all members accept and wallet balances are verified.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleDone}
            >
              <Text style={styles.primaryButtonText}>Done</Text>
              <Check color="#000000" size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Page description */}
            <Text style={styles.pageTitle}>
              Invite Your Friends
            </Text>

            <Text style={styles.pageDescription}>
              Add members to your private workout session.
              Users with sufficient wallet balance can be added.
            </Text>

            {/* Booking summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Text style={styles.sectionTitle}>
                  Booking Summary
                </Text>

                <View style={styles.groupTag}>
                  <Users color="#B6FF00" size={14} />
                  <Text style={styles.groupTagText}>GROUP</Text>
                </View>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date</Text>
                <Text style={styles.summaryValue}>
                  {bookingDetails.selectedDate || 'Not selected'}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Start Time</Text>
                <Text style={styles.summaryValue}>
                  {bookingDetails.selectedTime || 'Not selected'}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>
                  {bookingDetails.duration || 0} Hours
                </Text>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total Price</Text>
                <Text style={styles.totalPrice}>
                  {formatMoney(totalPrice)}
                </Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.shareLabel}>
                  Each Person's Share ({totalPeople} people)
                </Text>

                <Text style={styles.sharePrice}>
                  {formatMoney(pricePerPerson)}
                </Text>
              </View>
            </View>

            {/* Organizer wallet */}
            <View style={styles.walletCard}>
              <View style={styles.walletIcon}>
                <Wallet color="#B6FF00" size={21} />
              </View>

              <View style={styles.walletDetails}>
                <Text style={styles.walletTitle}>
                  Your Wallet Balance
                </Text>

                <Text style={styles.walletAmount}>
                  {formatMoney(organizerBalance)}
                </Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  organizerAvailable
                    ? styles.availableBadge
                    : styles.unavailableBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    organizerAvailable
                      ? styles.availableText
                      : styles.unavailableText,
                  ]}
                >
                  {organizerAvailable ? 'Available' : 'Unavailable'}
                </Text>
              </View>
            </View>

            {/* Add members */}
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Add Members</Text>
                <Text style={styles.sectionSubtitle}>
                  Search users by name or email
                </Text>
              </View>

              <View style={styles.memberCount}>
                <Text style={styles.memberCountText}>
                  {selectedMembers.length}/3
                </Text>
              </View>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Search color="#777777" size={19} />

              <TextInput
                style={styles.searchInput}
                placeholder="Search users..."
                placeholderTextColor="#777777"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
            </View>

            {/* User list */}
            {availableUsers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Users color="#666666" size={30} />
                <Text style={styles.emptyText}>No users found</Text>
              </View>
            ) : (
              availableUsers.map((user) => (
                <View key={user.id} style={styles.userCard}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {user.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{user.name}</Text>

                    <Text style={styles.userEmail}>
                      {user.email}
                    </Text>

                    <Text style={styles.userWallet}>
                      Wallet: {formatMoney(user.walletBalance)}
                    </Text>

                    {user.alreadyAdded ? (
                      <Text style={styles.addedText}>
                        Already added
                      </Text>
                    ) : (
                      <View style={styles.userStatusRow}>
                        {user.isAvailable ? (
                          <CheckCircle2
                            color="#B6FF00"
                            size={13}
                          />
                        ) : (
                          <XCircle
                            color="#FF5A5A"
                            size={13}
                          />
                        )}

                        <Text
                          style={[
                            styles.userStatusText,
                            user.isAvailable
                              ? styles.availableText
                              : styles.unavailableText,
                          ]}
                        >
                          {user.isAvailable
                            ? 'Available'
                            : 'Unavailable'}
                        </Text>
                      </View>
                    )}
                  </View>

                  {user.alreadyAdded ? (
                    <View style={styles.addedButton}>
                      <Check color="#B6FF00" size={18} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={!user.isAvailable}
                      style={[
                        styles.addButton,
                        !user.isAvailable && styles.disabledAddButton,
                      ]}
                      onPress={() => addMember(user)}
                    >
                      <UserPlus
                        color={user.isAvailable ? '#000000' : '#666666'}
                        size={18}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}

            {/* Selected members */}
            <View style={styles.selectedSection}>
              <Text style={styles.sectionTitle}>
                Selected Members ({selectedMembers.length})
              </Text>

              {selectedMembers.length === 0 ? (
                <View style={styles.emptySelected}>
                  <UserPlus color="#666666" size={24} />
                  <Text style={styles.emptySelectedText}>
                    No members added yet
                  </Text>
                </View>
              ) : (
                selectedMembers.map((member) => (
                  <View key={member.id} style={styles.selectedCard}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {member.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>

                    <View style={styles.userDetails}>
                      <Text style={styles.userName}>
                        {member.name}
                      </Text>

                      <Text style={styles.userWallet}>
                        Share: {formatMoney(pricePerPerson)}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeMember(member.id)}
                      style={styles.removeButton}
                    >
                      <Trash2 color="#FF5A5A" size={19} />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>

            {/* Payment information */}
            <View style={styles.noticeCard}>
              <Clock color="#B6FF00" size={19} />

              <Text style={styles.noticeText}>
                Wallet balances are checked before invitations are sent.
                No money will be deducted at this stage. Each member
                will be charged their share only after everyone accepts
                and the final wallet checks succeed.
              </Text>
            </View>

            {/* Send invitation */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                !canSendInvitations && styles.disabledPrimaryButton,
              ]}
              disabled={!canSendInvitations}
              onPress={handleSendInvitations}
            >
              <Text style={styles.primaryButtonText}>
                Send Invitations
              </Text>

              <Send color="#000000" size={19} />
            </TouchableOpacity>

            {!organizerAvailable && (
              <Text style={styles.warningText}>
                Your wallet balance is insufficient for your share.
              </Text>
            )}

            {selectedMembers.length > 0 && !allWalletsAvailable && (
              <Text style={styles.warningText}>
                One or more selected members do not have sufficient balance.
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupInvitationScreen;
