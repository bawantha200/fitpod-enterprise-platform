
import React from 'react';
import Text from '../components/AppText';
import {
  View,
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

const GREEN = '#B6FF00';

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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#000000' }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View className="flex-1 bg-black">

        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#252525]">

          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-[#1C1C1C] items-center justify-center"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft color="#FFFFFF" size={22} />
          </TouchableOpacity>

          <Text className="text-white text-lg font-bold">
            Group Booking
          </Text>

          <View className="w-10 h-10 items-center justify-center">
            <Users color={GREEN} size={22} />
          </View>

        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 22,
            paddingBottom: 25,
          }}
          showsVerticalScrollIndicator={false}
        >

          {invitationsSent ? (

            /* Invitation Success Screen */
            <View className="items-center">

              <View className="w-24 h-24 rounded-full bg-[#191F0C] items-center justify-center mb-5">
                <CheckCircle2 color={GREEN} size={52} />
              </View>

              <Text className="text-white text-2xl font-extrabold mb-3">
                Invitations Sent!
              </Text>

              <Text className="text-[#999999] text-sm text-center leading-6 mb-7">
                Your group invitations have been sent successfully.
                You can leave this screen while members respond.
              </Text>

              {/* Success Information */}
              <View className="w-full bg-[#151515] border border-[#303030] rounded-2xl p-5 mb-5">

                <Text className="text-[#999999] text-sm mb-2">
                  Group Members
                </Text>

                <Text className="text-white text-lg font-bold mb-4">
                  {totalPeople} People
                </Text>

                <View className="h-px bg-[#303030] mb-4" />

                <Text className="text-[#999999] text-sm mb-2">
                  Each Person's Share
                </Text>

                <Text className="text-[#B6FF00] text-lg font-bold mb-4">
                  {formatMoney(pricePerPerson)}
                </Text>

                <View className="h-px bg-[#303030] mb-4" />

                <Text className="text-[#999999] text-sm mb-2">
                  Payment Status
                </Text>

                <Text className="text-yellow-400 text-sm font-bold">
                  Pending Acceptance
                </Text>

              </View>

              {/* Notice */}
              <View className="w-full flex-row bg-[#151515] border border-[#303030] rounded-xl p-4 mb-6">

                <CheckCircle2 color={GREEN} size={19} />

                <Text className="flex-1 text-[#AAAAAA] text-xs leading-5 ml-3">
                  No money has been deducted from any wallet.
                  Payment will be processed automatically after
                  all members accept and wallet balances are verified.
                </Text>

              </View>

              {/* Done Button */}
              <TouchableOpacity
                className="w-full h-14 bg-[#B6FF00] rounded-xl flex-row items-center justify-center"
                onPress={handleDone}
                activeOpacity={0.85}
              >
                <Text className="text-black text-sm font-extrabold mr-2">
                  Done
                </Text>

                <Check color="#000000" size={20} />
              </TouchableOpacity>

            </View>

          ) : (

            <>

              {/* Page Description */}
              <Text className="text-white text-3xl font-extrabold mb-3">
                Invite Your Friends
              </Text>

              <Text className="text-[#999999] text-sm leading-6 mb-7">
                Add members to your private workout session.
                Users with sufficient wallet balance can be added.
              </Text>

              {/* Booking Summary */}
              <View className="bg-[#151515] border border-[#303030] rounded-2xl p-4 mb-6">

                <View className="flex-row items-center justify-between mb-5">

                  <Text className="text-white text-base font-bold">
                    Booking Summary
                  </Text>

                  <View className="flex-row items-center bg-[#252525] rounded-full px-3 py-2">
                    <Users color={GREEN} size={14} />

                    <Text className="text-[#B6FF00] text-[10px] font-bold ml-2">
                      GROUP
                    </Text>
                  </View>

                </View>

                {/* Date */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-[#999999] text-sm">Date</Text>

                  <Text className="text-white text-sm font-semibold">
                    {bookingDetails.selectedDate || 'Not selected'}
                  </Text>
                </View>

                {/* Start Time */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-[#999999] text-sm">Start Time</Text>

                  <Text className="text-white text-sm font-semibold">
                    {bookingDetails.selectedTime || 'Not selected'}
                  </Text>
                </View>

                {/* Duration */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-[#999999] text-sm">Duration</Text>

                  <Text className="text-white text-sm font-semibold">
                    {bookingDetails.duration || 0} Hours
                  </Text>
                </View>

                <View className="h-px bg-[#303030] mb-4" />

                {/* Total Price */}
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-[#999999] text-sm">
                    Total Price
                  </Text>

                  <Text className="text-white text-base font-bold">
                    {formatMoney(totalPrice)}
                  </Text>
                </View>

                {/* Each Person Share */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-[#999999] text-sm">
                      Each Person's Share
                    </Text>

                    <Text className="text-[#777777] text-xs mt-1">
                      ({totalPeople} people)
                    </Text>
                  </View>

                  <Text className="text-[#B6FF00] text-lg font-extrabold">
                    {formatMoney(pricePerPerson)}
                  </Text>
                </View>

              </View>

              {/* Organizer Wallet */}
              <View className="flex-row items-center bg-[#151515] border border-[#303030] rounded-2xl p-4 mb-7">

                <View className="w-11 h-11 rounded-xl bg-[#252525] items-center justify-center mr-3">
                  <Wallet color={GREEN} size={21} />
                </View>

                <View className="flex-1">
                  <Text className="text-[#999999] text-xs mb-1">
                    Your Wallet Balance
                  </Text>

                  <Text className="text-white text-lg font-extrabold">
                    {formatMoney(organizerBalance)}
                  </Text>
                </View>

                <View className={`rounded-full px-3 py-2 ${
                  organizerAvailable ? 'bg-[#1B2B0C]' : 'bg-[#351717]'
                }`}>
                  <Text className={`text-[10px] font-bold ${
                    organizerAvailable ? 'text-[#B6FF00]' : 'text-red-400'
                  }`}>
                    {organizerAvailable ? 'Available' : 'Unavailable'}
                  </Text>
                </View>

              </View>

              {/* Add Members Header */}
              <View className="flex-row items-center justify-between mb-4">

                <View>
                  <Text className="text-white text-lg font-bold">
                    Add Members
                  </Text>

                  <Text className="text-[#999999] text-xs mt-1">
                    Search users by name or email
                  </Text>
                </View>

                <View className="bg-[#252525] rounded-full px-3 py-2">
                  <Text className="text-[#B6FF00] text-xs font-bold">
                    {selectedMembers.length}/3
                  </Text>
                </View>

              </View>

              {/* Search */}
              <View className="flex-row items-center bg-[#151515] border border-[#303030] rounded-xl px-4 h-12 mb-5">

                <Search color="#777777" size={19} />

                <TextInput
                  className="flex-1 text-white text-sm ml-3"
                  placeholder="Search users..."
                  placeholderTextColor="#777777"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCapitalize="none"
                />

              </View>

              {/* User List */}
              {availableUsers.length === 0 ? (

                <View className="items-center justify-center bg-[#151515] rounded-xl py-8 mb-5">
                  <Users color="#666666" size={30} />

                  <Text className="text-[#999999] text-sm mt-3">
                    No users found
                  </Text>
                </View>

              ) : (

                <View className="gap-3 mb-6">

                  {availableUsers.map((user) => (

                    <View
                      key={user.id}
                      className="flex-row items-center bg-[#151515] border border-[#303030] rounded-xl p-3"
                    >

                      {/* Avatar */}
                      <View className="w-11 h-11 rounded-full bg-[#292929] items-center justify-center mr-3">
                        <Text className="text-[#B6FF00] text-lg font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>

                      {/* User Details */}
                      <View className="flex-1">

                        <Text className="text-white text-sm font-bold">
                          {user.name}
                        </Text>

                        <Text className="text-[#999999] text-xs mt-1">
                          {user.email}
                        </Text>

                        <Text className="text-[#AAAAAA] text-xs mt-2">
                          Wallet: {formatMoney(user.walletBalance)}
                        </Text>

                        {user.alreadyAdded ? (

                          <Text className="text-[#B6FF00] text-xs mt-2">
                            Already added
                          </Text>

                        ) : (

                          <View className="flex-row items-center mt-2">

                            {user.isAvailable ? (
                              <CheckCircle2 color={GREEN} size={13} />
                            ) : (
                              <XCircle color="#FF5A5A" size={13} />
                            )}

                            <Text className={`text-xs ml-1 ${
                              user.isAvailable ? 'text-[#B6FF00]' : 'text-red-400'
                            }`}>
                              {user.isAvailable ? 'Available' : 'Unavailable'}
                            </Text>

                          </View>

                        )}

                      </View>

                      {/* Add Button */}
                      {user.alreadyAdded ? (

                        <View className="w-9 h-9 rounded-lg bg-[#252525] items-center justify-center">
                          <Check color={GREEN} size={18} />
                        </View>

                      ) : (

                        <TouchableOpacity
                          disabled={!user.isAvailable}
                          className={`w-9 h-9 rounded-lg items-center justify-center ${
                            user.isAvailable ? 'bg-[#B6FF00]' : 'bg-[#333333]'
                          }`}
                          onPress={() => addMember(user)}
                          activeOpacity={0.8}
                        >
                          <UserPlus
                            color={user.isAvailable ? '#000000' : '#666666'}
                            size={18}
                          />
                        </TouchableOpacity>

                      )}

                    </View>

                  ))}

                </View>

              )}

              {/* Selected Members */}
              <View className="mb-6">

                <Text className="text-white text-lg font-bold mb-4">
                  Selected Members ({selectedMembers.length})
                </Text>

                {selectedMembers.length === 0 ? (

                  <View className="items-center justify-center bg-[#151515] border border-[#303030] rounded-xl py-7">
                    <UserPlus color="#666666" size={24} />

                    <Text className="text-[#999999] text-sm mt-3">
                      No members added yet
                    </Text>
                  </View>

                ) : (

                  <View className="gap-3">

                    {selectedMembers.map((member) => (

                      <View
                        key={member.id}
                        className="flex-row items-center bg-[#151515] border border-[#303030] rounded-xl p-3"
                      >

                        <View className="w-11 h-11 rounded-full bg-[#292929] items-center justify-center mr-3">
                          <Text className="text-[#B6FF00] text-lg font-bold">
                            {member.name.charAt(0).toUpperCase()}
                          </Text>
                        </View>

                        <View className="flex-1">
                          <Text className="text-white text-sm font-bold">
                            {member.name}
                          </Text>

                          <Text className="text-[#999999] text-xs mt-1">
                            Share: {formatMoney(pricePerPerson)}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => removeMember(member.id)}
                          className="w-9 h-9 rounded-lg bg-[#351717] items-center justify-center"
                        >
                          <Trash2 color="#FF5A5A" size={19} />
                        </TouchableOpacity>

                      </View>

                    ))}

                  </View>

                )}

              </View>

              {/* Payment Information */}
              <View className="flex-row bg-[#151515] border border-[#303030] rounded-xl p-4 mb-5">

                <Clock color={GREEN} size={19} />

                <Text className="flex-1 text-[#AAAAAA] text-xs leading-5 ml-3">
                  Wallet balances are checked before invitations are sent.
                  No money will be deducted at this stage. Each member
                  will be charged their share only after everyone accepts
                  and the final wallet checks succeed.
                </Text>

              </View>

              {/* Send Invitation */}
              <TouchableOpacity
                className={`h-14 rounded-xl flex-row items-center justify-center ${
                  canSendInvitations ? 'bg-[#B6FF00]' : 'bg-[#555555]'
                }`}
                disabled={!canSendInvitations}
                onPress={handleSendInvitations}
                activeOpacity={0.85}
              >

                <Text className="text-black text-sm font-extrabold mr-2">
                  Send Invitations
                </Text>

                <Send color="#000000" size={19} />

              </TouchableOpacity>

              {!organizerAvailable && (
                <Text className="text-red-400 text-xs text-center mt-3">
                  Your wallet balance is insufficient for your share.
                </Text>
              )}

              {selectedMembers.length > 0 && !allWalletsAvailable && (
                <Text className="text-red-400 text-xs text-center mt-3">
                  One or more selected members do not have sufficient balance.
                </Text>
              )}

            </>

          )}

        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default GroupInvitationScreen;
