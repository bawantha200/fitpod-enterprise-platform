import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, QrCode, Lock } from 'lucide-react-native';

import Text from '../components/AppText';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';
const BACKGROUND = '#000000';

// Row used in the pass card (label on the left, value on the right)
const InfoRow = ({ label, value }) => (
  <View className="flex-row items-center justify-between">
    <Text className="text-[13px] text-[#A0A0A0]">{label}</Text>
    <Text className="text-[13px] font-medium text-white">{value}</Text>
  </View>
);

const AccessPassScreen = ({ navigation, route }) => {
  // Demo values. Later, pass these in through route.params from the booking.
  const {
    guestName = 'Nethmi Perera',
    bookingId = 'FP-261030-014',
    otp = '482716',
    validOn = 'Fri 30 Oct 2026',
    accessTime = '06:15 PM–08:15 PM',
    duration = '2 hours · Individual',
    status = 'PAID',
  } = route?.params || {};

  const steps = [
    '1. Open your confirmed booking’s access pass.',
    '2. Use the door reader or enter your OTP.',
    '3. Need help? Open AI Customer Support.',
  ];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: BACKGROUND }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND} />

      {/* Header */}
      <View className="h-[60px] flex-row items-center justify-between px-5">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={WHITE} strokeWidth={1.8} />
          </TouchableOpacity>

          <Text className="ml-3 text-base font-semibold text-white">
            Your access pass
          </Text>
        </View>

        <Text className="text-xs font-extrabold text-[#B6FF00]">FitPod</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pt-2.5 pb-7"
      >
        {/* Title */}
        <Text className="text-[26px] font-bold text-white">
          Your key to private.
        </Text>
        <Text className="mt-1 text-[13px] text-[#A0A0A0]">
          Keep your pass private. Use it at the pod door.
        </Text>

        {/* Pass card */}
        <View className="mt-4 rounded-[18px] bg-[#171717] p-5">
          {/* Card header */}
          <View className="flex-row items-start justify-between">
            <Text className="flex-1 text-[11px] font-bold text-[#B6FF00]">
              FITPOD / DIGITAL PASS
            </Text>

            <View className="rounded-full border border-[#B6FF00] bg-black px-[9px] py-[5px]">
              <Text className="text-[10px] font-semibold text-[#B6FF00]">
                {status}
              </Text>
            </View>
          </View>

          <Text className="mt-3 text-base font-bold text-white">
            FitPod Private Fitness Pod
          </Text>

          <Text className="mt-3 text-[11px] text-[#A0A0A0]">
            {guestName} · {bookingId}
          </Text>

          <View className="my-3 h-px bg-[#303030]" />

          {/* OTP */}
          <Text className="text-center text-[10px] text-[#A0A0A0]">
            SIX-DIGIT DEMO OTP
          </Text>

          <View className="mt-3 flex-row justify-center">
            {otp.split('').map((digit, index) => (
              <View
                key={index}
                className={`h-12 w-10 items-center justify-center rounded-lg bg-black ${
                  index > 0 ? 'ml-[7px]' : ''
                }`}
              >
                <Text className="text-[27px] font-bold text-[#B6FF00]">
                  {digit}
                </Text>
              </View>
            ))}
          </View>

          {/* QR placeholder */}
          <View className="mt-4 items-center">
            <View className="h-[132px] w-[132px] items-center justify-center rounded-xl bg-white">
              <QrCode size={80} color={BACKGROUND} strokeWidth={1.8} />
              <Text className="mt-[7px] text-[9px] font-bold text-black">
                DEMO · NOT SCANNABLE
              </Text>
            </View>
          </View>

          {/* Details */}
          <View className="mt-4">
            <InfoRow label="Valid on" value={validOn} />
            <View className="h-3" />
            <InfoRow label="Valid access time" value={accessTime} />
            <View className="h-3" />
            <InfoRow label="Duration" value={duration} />
          </View>
        </View>

        {/* Access scheduled notice */}
        <View className="mt-4 flex-row items-start rounded-xl border border-[#303030] p-[13px]">
          <Lock size={19} color={GREEN} strokeWidth={1.8} />

          <View className="ml-2.5 flex-1">
            <Text className="text-xs font-semibold text-[#B6FF00]">
              Access scheduled · Door locked
            </Text>
            <Text className="mt-[3px] text-[11px] leading-[15px] text-[#A0A0A0]">
              This future booking does not unlock the pod now. Access is valid
              only during your reserved interval.
            </Text>
          </View>
        </View>

        {/* At the pod */}
        <View className="mt-4 rounded-[18px] bg-[#171717] p-4">
          <Text className="text-sm font-semibold text-white">At the pod</Text>

          {steps.map((step) => (
            <Text key={step} className="mt-[9px] text-xs text-[#A0A0A0]">
              {step}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccessPassScreen;