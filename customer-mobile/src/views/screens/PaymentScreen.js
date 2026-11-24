
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  CreditCard,
  Wallet,
  CalendarDays,
  Clock,
  CheckCircle2,
} from 'lucide-react-native';

import usePaymentViewModel from '../../viewmodels/usePaymentViewModel';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';
const GREY = '#999999';

const PaymentScreen = ({ navigation, route }) => {
  const {
    booking,
    paymentMethod,
    walletBalance,
    remainingBalance,
    totalPrice,
    duration,
    hourlyRate,
    endTime,
    formattedDate,
    hasSufficientBalance,
    canConfirmPayment,
    selectPaymentMethod,
  } = usePaymentViewModel(route?.params || {});

  const podName =
    booking.selectedPod?.name || 'FitPod Private Fitness Pod';

  const bookingType = booking.bookingType || 'Individual';

  const selectedTime = booking.selectedTime || '--:--';

  const handleConfirmPayment = () => {
    if (!booking.selectedDate || !booking.selectedTime) {
      Alert.alert(
        'Booking Details Missing',
        'Please go back and select your booking date and time.'
      );
      return;
    }

    if (paymentMethod === 'WALLET' && !hasSufficientBalance) {
      Alert.alert(
        'Insufficient Wallet Balance',
        'Please top up your wallet or select PayHere Card Payment.'
      );
      return;
    }

    // Payment integration will be connected to the backend later.
    Alert.alert(
      'Payment Integration',
      paymentMethod === 'WALLET'
        ? 'Wallet payment API is not connected yet.'
        : 'PayHere payment integration is not connected yet.'
    );
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
            <ArrowLeft size={23} color={WHITE} />
          </TouchableOpacity>

          <View className="flex-1 items-center">
            <Text className="text-white text-lg font-bold">
              Payments
            </Text>
          </View>

          <Text className="text-[#B6FF00] text-base font-extrabold">
            FitPod
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 22,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >

          {/* Step Indicator */}
          <Text className="text-[#B6FF00] text-xs font-bold tracking-widest mb-3">
            RESERVATION · 03 / 03
          </Text>

          <Text className="text-white text-3xl font-extrabold mb-2">
            One step to your space.
          </Text>

          <Text className="text-[#999999] text-sm leading-6 mb-7">
            Review your booking and choose how you want to pay.
          </Text>

          {/* Booking Summary */}
          <View className="mb-7">

            <Text className="text-white text-xs font-bold tracking-widest mb-4">
              BOOKING SUMMARY
            </Text>

            <View className="bg-[#151515] border border-[#303030] rounded-2xl p-4">

              {/* Pod Information */}
              <View className="flex-row items-center mb-4">

                <View className="w-12 h-12 rounded-xl bg-[#252525] items-center justify-center mr-3">
                  <Text className="text-[#B6FF00] text-base font-extrabold">
                    FP
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="text-white text-base font-bold">
                    {podName}
                  </Text>

                  <Text className="text-[#999999] text-xs mt-1">
                    {bookingType} · {duration} {duration === 1 ? 'hour' : 'hours'}
                  </Text>
                </View>

              </View>

              <View className="h-px bg-[#303030] mb-4" />

              {/* Date */}
              <View className="flex-row items-center justify-between mb-4">

                <View className="flex-row items-center">
                  <CalendarDays size={17} color={GREY} />
                  <Text className="text-[#999999] text-sm ml-2">
                    Date
                  </Text>
                </View>

                <Text className="text-white text-sm font-semibold">
                  {formattedDate}
                </Text>

              </View>

              {/* Time */}
              <View className="flex-row items-center justify-between mb-4">

                <View className="flex-row items-center">
                  <Clock size={17} color={GREY} />
                  <Text className="text-[#999999] text-sm ml-2">
                    Time
                  </Text>
                </View>

                <Text className="text-white text-sm font-semibold">
                  {selectedTime} – {endTime}
                </Text>

              </View>

              <View className="h-px bg-[#303030] mb-4" />

              {/* Price */}
              <View className="flex-row items-center justify-between mb-4">

                <Text className="text-[#999999] text-sm">
                  {duration} {duration === 1 ? 'hour' : 'hours'} × Rs. {hourlyRate.toLocaleString('en-LK')}
                </Text>

                <Text className="text-white text-sm font-semibold">
                  Rs. {totalPrice.toLocaleString('en-LK')}
                </Text>

              </View>

              {/* Total */}
              <View className="flex-row items-center justify-between">
                <Text className="text-white text-sm font-bold tracking-widest">
                  TOTAL
                </Text>

                <Text className="text-[#B6FF00] text-xl font-extrabold">
                  Rs. {totalPrice.toLocaleString('en-LK')}
                </Text>
              </View>

            </View>
          </View>

          {/* Payment Methods */}
          <View className="mb-7">

            <Text className="text-white text-xs font-bold tracking-widest mb-4">
              PAYMENT METHOD
            </Text>

            {/* PayHere */}
            <TouchableOpacity
              className={`flex-row items-center border rounded-2xl p-4 mb-3 ${
                paymentMethod === 'PAYHERE'
                  ? 'border-[#B6FF00] bg-[#191F0C]'
                  : 'border-[#303030] bg-[#151515]'
              }`}
              onPress={() => selectPaymentMethod('PAYHERE')}
              activeOpacity={0.8}
            >

              <View className="w-11 h-11 rounded-xl bg-[#252525] items-center justify-center mr-3">
                <CreditCard size={22} color={WHITE} />
              </View>

              <View className="flex-1">
                <Text className="text-white text-sm font-bold">
                  PayHere Card Payment
                </Text>

                <Text className="text-[#999999] text-xs mt-1">
                  Pay securely by debit or credit card
                </Text>
              </View>

              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                paymentMethod === 'PAYHERE'
                  ? 'border-[#B6FF00]'
                  : 'border-[#777777]'
              }`}>
                {paymentMethod === 'PAYHERE' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-[#B6FF00]" />
                )}
              </View>

            </TouchableOpacity>

            {/* Wallet */}
            <TouchableOpacity
              className={`flex-row items-center border rounded-2xl p-4 ${
                paymentMethod === 'WALLET'
                  ? 'border-[#B6FF00] bg-[#191F0C]'
                  : 'border-[#303030] bg-[#151515]'
              }`}
              onPress={() => selectPaymentMethod('WALLET')}
              activeOpacity={0.8}
            >

              <View className="w-11 h-11 rounded-xl bg-[#252525] items-center justify-center mr-3">
                <Wallet size={22} color={GREEN} />
              </View>

              <View className="flex-1">
                <Text className="text-white text-sm font-bold">
                  In-App Wallet
                </Text>

                <Text className="text-[#999999] text-xs mt-1">
                  Balance: Rs. {walletBalance.toLocaleString('en-LK')}
                </Text>

                {!hasSufficientBalance && (
                  <Text className="text-red-400 text-xs mt-2">
                    Insufficient balance
                  </Text>
                )}
              </View>

              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                paymentMethod === 'WALLET'
                  ? 'border-[#B6FF00]'
                  : 'border-[#777777]'
              }`}>
                {paymentMethod === 'WALLET' && (
                  <View className="w-2.5 h-2.5 rounded-full bg-[#B6FF00]" />
                )}
              </View>

            </TouchableOpacity>

            {/* Remaining Balance */}
            {paymentMethod === 'WALLET' && hasSufficientBalance && (
              <View className="bg-[#151515] border border-[#303030] rounded-xl p-4 mt-3">

                <Text className="text-[#999999] text-xs mb-2">
                  Wallet balance after payment
                </Text>

                <Text className="text-[#B6FF00] text-lg font-extrabold">
                  Rs. {remainingBalance.toLocaleString('en-LK')}
                </Text>

              </View>
            )}

          </View>

          {/* Booking Hold Information */}
          <View className="flex-row bg-[#151515] border border-[#303030] rounded-2xl p-4 mb-3">

            <View className="w-10 h-10 rounded-xl bg-[#252525] items-center justify-center mr-3">
              <Clock size={19} color={GREEN} />
            </View>

            <View className="flex-1">
              <Text className="text-white text-sm font-bold mb-2">
                Temporary booking hold
              </Text>

              <Text className="text-[#999999] text-xs leading-5">
                Your selected time will be held for 5 minutes after the
                booking service confirms the temporary reservation.
              </Text>
            </View>

          </View>

        </ScrollView>

        {/* Bottom Confirm Button */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 8,
            backgroundColor: '#000000',
            borderTopWidth: 1,
            borderTopColor: '#303030',
          }}
        >

          <TouchableOpacity
            className={`h-14 rounded-xl flex-row items-center justify-center ${
              canConfirmPayment ? 'bg-[#B6FF00]' : 'bg-[#555555]'
            }`}
            onPress={handleConfirmPayment}
            activeOpacity={0.85}
            disabled={!canConfirmPayment}
          >
            <Text className="text-black text-sm font-extrabold mr-2">
              Confirm Payment
            </Text>

            <CheckCircle2 size={20} color="#000000" />
          </TouchableOpacity>

          <Text className="text-[#777777] text-[10px] text-center leading-4 mt-3">
            Only the pod rental is included. Cafe items are not included
            in this payment.
          </Text>

        </View>

      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
