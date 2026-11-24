
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {
  Bell,
  UserRound,
  ChevronLeft,
  Lock,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useReviewPaymentViewModel from '../../viewmodels/useReviewPaymentViewModel';

const BACKGROUND = '#000000';
const WHITE = '#FFFFFF';

const ReviewPaymentScreen = ({ navigation, route }) => {
  const {
    amount,
    amountText,
    isProcessing,
    isDemoMode,
    handleBack,
    handleConfirm,
  } = useReviewPaymentViewModel({ navigation, route });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: BACKGROUND }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND} />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-5 pt-4">
        <View className="flex-row items-center">
          <Text className="text-[28px] font-extrabold tracking-tight text-white">
            FitPod
          </Text>
          <View className="ml-1.5 h-2 w-2 rounded-full bg-[#B6FF00]" />
        </View>

        <View className="flex-row items-center gap-5">
          <Bell size={21} color={WHITE} strokeWidth={1.8} />
          <UserRound size={21} color={WHITE} strokeWidth={1.8} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1, backgroundColor: BACKGROUND }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View className="mt-6 flex-row items-center">
          <TouchableOpacity
            className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]"
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <ChevronLeft size={26} color={WHITE} strokeWidth={2} />
          </TouchableOpacity>

          <Text className="text-[25px] font-extrabold text-white">
            Review payment
          </Text>
        </View>

        <Text className="mb-7 mt-3 text-sm text-gray-400">
          One last look before you top up.
        </Text>

        {/* Amount */}
        <View className="rounded-[24px] bg-[#B6FF00] p-6">
          <Text className="text-xs font-bold tracking-[2px] text-black/60">
            ADDING TO YOUR WALLET
          </Text>

          <View className="mt-5 flex-row items-baseline">
            <Text className="mr-2 text-xl font-bold text-black">
              Rs.
            </Text>

            <Text className="text-[38px] font-extrabold text-black">
              {amountText}
            </Text>
          </View>

          <Text className="mt-2 text-xs font-medium text-black/60">
            LKR · FitPod wallet
          </Text>
        </View>

        {/* Details */}
        <View className="mt-6 rounded-[22px] border border-[#292929] bg-[#111111] p-5">
          <Text className="mb-6 text-lg font-bold text-white">
            Payment details
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-gray-400">
              Payment method
            </Text>

            <Text className="text-sm font-semibold text-white">
              PayHere
            </Text>
          </View>

          <View className="my-5 h-px bg-[#292929]" />

          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-bold text-white">
              Total to pay
            </Text>

            <Text className="text-base font-extrabold text-[#B6FF00]">
              Rs. {amountText}
            </Text>
          </View>
        </View>

        <Text className="mt-5 text-center text-xs leading-5 text-gray-500">
          Your wallet is credited after payment is confirmed.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View className="border-t border-[#222222] bg-black px-6 pb-5 pt-4">
        <TouchableOpacity
          className={`flex-row items-center justify-center rounded-2xl py-4 ${
            isProcessing || amount <= 0
              ? 'bg-[#B6FF00]/40'
              : 'bg-[#B6FF00]'
          }`}
          onPress={handleConfirm}
          disabled={isProcessing || amount <= 0}
          activeOpacity={0.85}
        >
          {isProcessing ? (
            <ActivityIndicator color={BACKGROUND} />
          ) : (
            <>
              <Text className="mr-2 text-base font-extrabold text-black">
                Confirm Payment
              </Text>

              <Lock size={18} color={BACKGROUND} strokeWidth={2} />
            </>
          )}
        </TouchableOpacity>

        <Text className="mt-3 text-center text-[11px] text-gray-500">
          {isDemoMode
            ? 'Demo checkout · No money will be charged.'
            : 'Secure checkout · Processed by PayHere'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ReviewPaymentScreen;
