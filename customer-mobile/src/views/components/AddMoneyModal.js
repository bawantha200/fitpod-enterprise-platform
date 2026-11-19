
import React, { useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { X, Lock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BLACK = '#000000';
const WHITE = '#FFFFFF';

const formatNumber = (value) =>
  Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatAmount = (value) => `Rs. ${formatNumber(value)}`;

const CardLogos = () => (
  <View className="mt-5 flex-row items-center justify-center gap-3">
    {/* VISA */}
    <View className="h-8 w-[58px] items-center justify-center rounded-md bg-white">
      <Text className="text-sm font-extrabold italic text-blue-800">
        VISA
      </Text>
    </View>

    {/* Mastercard */}
    <View className="h-8 w-[58px] flex-row items-center justify-center rounded-md bg-white">
      <View className="h-4 w-4 rounded-full bg-red-600" />
      <View className="-ml-2 h-4 w-4 rounded-full bg-orange-500/90" />
    </View>

    {/* AMEX */}
    <View className="h-8 w-[58px] items-center justify-center rounded-md bg-blue-600">
      <Text className="text-xs font-extrabold text-white">
        AMEX
      </Text>
    </View>

    {/* Discover */}
    <View className="h-8 w-[68px] items-center justify-center overflow-hidden rounded-md bg-white">
      <View className="absolute bottom-0 h-2 w-full bg-orange-400" />
      <Text className="text-[9px] font-extrabold text-black">
        DISCOVER
      </Text>
    </View>
  </View>
);

const AddMoneyModal = ({
  visible,
  onClose,
  presets,
  amountText,
  amount,
  isCustom,
  canContinue,
  onSelectPreset,
  onSelectCustom,
  onChangeAmount,
  onContinue,
}) => {
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);

  const handleCustomPress = () => {
    onSelectCustom();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 justify-end bg-black/70"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Tap outside to close */}
        <Pressable
          className="absolute inset-0"
          onPress={onClose}
        />

        {/* Bottom Sheet */}
        <View
          className="max-h-[92%] rounded-t-[30px] border-t border-[#303030] bg-[#111111]"
          style={{ paddingBottom: insets.bottom }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingTop: 14,
              paddingBottom: 24,
            }}
          >
            {/* Handle */}
            <View className="mb-6 h-1.5 w-12 self-center rounded-full bg-[#555555]" />

            {/* Header */}
            <View className="mb-8 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-[25px] font-extrabold text-white">
                  Add Money
                </Text>

                <Text className="mt-2 text-sm text-gray-400">
                  Add funds to your FitPod wallet.
                </Text>
              </View>

              <TouchableOpacity
                className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-[#252525]"
                onPress={onClose}
                activeOpacity={0.8}
              >
                <X size={22} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>

            {/* Preset amounts */}
            <Text className="mb-4 text-sm font-bold text-white">
              Choose an amount
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {presets.map((value) => {
                const selected = !isCustom && amount === value;

                return (
                  <TouchableOpacity
                    key={value}
                    className={`min-w-[45%] flex-1 items-center justify-center rounded-xl border py-4 ${
                      selected
                        ? 'border-[#B6FF00] bg-[#B6FF00]/10'
                        : 'border-[#333333] bg-[#1A1A1A]'
                    }`}
                    onPress={() => onSelectPreset(value)}
                    activeOpacity={0.85}
                  >
                    <Text
                      className={`text-sm font-bold ${
                        selected ? 'text-[#B6FF00]' : 'text-white'
                      }`}
                    >
                      {formatAmount(value)}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                className={`min-w-[45%] flex-1 items-center justify-center rounded-xl border py-4 ${
                  isCustom
                    ? 'border-[#B6FF00] bg-[#B6FF00]/10'
                    : 'border-[#333333] bg-[#1A1A1A]'
                }`}
                onPress={handleCustomPress}
                activeOpacity={0.85}
              >
                <Text
                  className={`text-sm font-bold ${
                    isCustom ? 'text-[#B6FF00]' : 'text-white'
                  }`}
                >
                  Custom Amount
                </Text>
              </TouchableOpacity>
            </View>

            {/* Amount input */}
            <Text className="mb-3 mt-7 text-sm font-bold text-white">
              Amount
            </Text>

            <View className="flex-row items-center rounded-xl border border-[#383838] bg-[#1A1A1A] px-4 py-4">
              <Text className="mr-3 text-base font-bold text-gray-400">
                Rs.
              </Text>

              <TextInput
                ref={inputRef}
                className="flex-1 p-0 text-lg font-bold text-white"
                value={
                  amountText
                    ? Number(amountText).toLocaleString('en-US')
                    : ''
                }
                onChangeText={onChangeAmount}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor="#5A5A5A"
                selectionColor="#B6FF00"
                maxLength={11}
              />

              <Text className="ml-3 text-xs font-semibold text-gray-500">
                LKR
              </Text>
            </View>

            {/* Info */}
            <Text className="mt-5 text-xs leading-5 text-gray-400">
              Securely add money to your FitPod wallet using your preferred
              credit or debit card. All payments are safely processed through
              PayHere.
            </Text>

            <CardLogos />

            {/* Summary */}
            <View className="mt-6 flex-row items-center justify-between rounded-xl border border-[#333333] bg-[#1A1A1A] p-4">
              <Text className="text-sm text-gray-400">
                You’re adding
              </Text>

              <Text className="text-base font-extrabold text-[#B6FF00]">
                {formatAmount(amount)}
              </Text>
            </View>

            {/* Continue */}
            <TouchableOpacity
              className={`mt-5 flex-row items-center justify-center rounded-xl py-4 ${
                canContinue ? 'bg-[#B6FF00]' : 'bg-[#B6FF00]/40'
              }`}
              onPress={onContinue}
              disabled={!canContinue}
              activeOpacity={0.85}
            >
              <Text className="mr-2 text-sm font-extrabold text-black">
                Continue to Payment
              </Text>

              <Lock size={18} color={BLACK} strokeWidth={2} />
            </TouchableOpacity>

            <Text className="mt-4 text-center text-[11px] text-gray-500">
              Secure checkout · Your details stay protected
            </Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMoneyModal;
