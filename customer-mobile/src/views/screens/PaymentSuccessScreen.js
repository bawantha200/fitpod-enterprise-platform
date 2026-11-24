
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from 'react-native';

import { Bell, UserRound, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { isDemoMode } from '../../services/paymentService';

const BACKGROUND = '#000000';
const WHITE = '#FFFFFF';

const formatNumber = (value) =>
  Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const PaymentSuccessScreen = ({ navigation, route }) => {
  const amount = route?.params?.amount ?? 0;
  const newBalance = route?.params?.newBalance ?? 0;

  const goToWallet = React.useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'Wallet' } }],
    });
  }, [navigation]);

  // Android back button -> Wallet
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          goToWallet();
          return true;
        }
      );

      return () => subscription.remove();
    }, [goToWallet])
  );

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
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingTop: 38,
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Badge */}
        <View className="mb-7 h-[92px] w-[92px] items-center justify-center rounded-full bg-[#B6FF00]/15">
          <View className="h-[68px] w-[68px] items-center justify-center rounded-full bg-[#B6FF00]">
            <Check size={34} color={BACKGROUND} strokeWidth={3} />
          </View>
        </View>

        {/* Title */}
        <Text className="text-center text-[28px] font-extrabold text-white">
          Wallet topped up!
        </Text>

        <Text className="mt-3 text-center text-sm text-gray-400">
          You’re all set for your next session.
        </Text>

        {/* Receipt */}
        <View className="mt-9 w-full rounded-[24px] border border-[#292929] bg-[#111111] p-6">
          <Text className="text-center text-xs font-bold tracking-[2px] text-gray-400">
            AMOUNT ADDED
          </Text>

          <View className="mt-4 flex-row items-baseline justify-center">
            <Text className="mr-2 text-xl font-bold text-white">
              Rs.
            </Text>

            <Text className="text-[36px] font-extrabold text-[#B6FF00]">
              {formatNumber(amount)}
            </Text>
          </View>

          <View className="my-6 h-px bg-[#292929]" />

          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-sm text-gray-400">
              Paid with
            </Text>

            <Text className="text-sm font-semibold text-white">
              PayHere
            </Text>
          </View>

          <View className="mb-5 flex-row items-center justify-between">
            <Text className="text-sm text-gray-400">
              Status
            </Text>

            <Text className="text-sm font-bold text-[#B6FF00]">
              Successful
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-sm font-semibold text-white">
              New wallet balance
            </Text>

            <Text className="text-sm font-extrabold text-[#B6FF00]">
              Rs. {formatNumber(newBalance)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="border-t border-[#222222] bg-black px-6 pb-5 pt-4">
        <TouchableOpacity
          className="items-center justify-center rounded-2xl bg-[#B6FF00] py-4"
          onPress={goToWallet}
          activeOpacity={0.85}
        >
          <Text className="text-base font-extrabold text-black">
            Back to Wallet
          </Text>
        </TouchableOpacity>

        {isDemoMode && (
          <Text className="mt-3 text-center text-[11px] text-gray-500">
            Demo receipt · For interaction preview only
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;
