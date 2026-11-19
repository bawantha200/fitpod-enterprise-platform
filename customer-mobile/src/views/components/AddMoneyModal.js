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
  StyleSheet,
} from 'react-native';
import { X, Lock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from '../styles/AddMoneyModal.styles';

const BLACK = '#000000';
const WHITE = '#FFFFFF';

const formatNumber = (value) =>
  Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatAmount = (value) => `Rs. ${formatNumber(value)}`;

const CardLogos = () => (
  <View style={styles.cardLogosRow}>
    <View style={[styles.cardLogo, styles.visaLogo]}>
      <Text style={[styles.logoText, styles.visaText]}>VISA</Text>
    </View>

    <View style={[styles.cardLogo, styles.mastercardLogo]}>
      <View style={styles.mcCircleRed} />
      <View style={styles.mcCircleOrange} />
    </View>

    <View style={[styles.cardLogo, styles.amexLogo]}>
      <Text style={styles.logoText}>AMEX</Text>
    </View>

    <View style={[styles.cardLogo, styles.discoverLogo]}>
      <View style={styles.discoverStripe} />
      <Text style={[styles.logoText, { fontSize: 9 }]}>DISCOVER</Text>
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
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Tap outside to close */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={[styles.sheet, { paddingBottom: insets.bottom }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sheetContent}
          >
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.headerRow}>
              <View style={styles.headerTextWrap}>
                <Text style={styles.title}>Add Money</Text>
                <Text style={styles.subtitle}>
                  Add funds to your FitPod wallet.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <X size={22} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>

            {/* Preset amounts */}
            <Text style={styles.sectionLabel}>Choose an amount</Text>

            <View style={styles.chipGrid}>
              {presets.map((value) => {
                const selected = !isCustom && amount === value;

                return (
                  <TouchableOpacity
                    key={value}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => onSelectPreset(value)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.chipText}>{formatAmount(value)}</Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={[styles.chip, isCustom && styles.chipSelected]}
                onPress={handleCustomPress}
                activeOpacity={0.85}
              >
                <Text style={[styles.chipText, styles.chipTextSmall]}>
                  Custom Amount
                </Text>
              </TouchableOpacity>
            </View>

            {/* Amount input */}
            <Text style={styles.inputLabel}>Amount</Text>

            <View style={styles.inputBox}>
              <Text style={styles.inputPrefix}>Rs.</Text>

              <TextInput
                ref={inputRef}
                style={styles.input}
                value={amountText ? Number(amountText).toLocaleString('en-US') : ''}
                onChangeText={onChangeAmount}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor="#5A5A5A"
                selectionColor="#B6FF00"
                maxLength={11}
              />

              <Text style={styles.inputSuffix}>LKR</Text>
            </View>

            {/* Info */}
            <Text style={styles.description}>
              Securely add money to your FitPod wallet using your preferred
              credit or debit card. All payments are safely processed through
              PayHere.
            </Text>

            <CardLogos />

            {/* Summary */}
            <View style={styles.summaryBox}>
              <Text style={styles.summaryLabel}>You’re adding</Text>
              <Text style={styles.summaryValue}>{formatAmount(amount)}</Text>
            </View>

            {/* Continue */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                !canContinue && styles.continueButtonDisabled,
              ]}
              onPress={onContinue}
              disabled={!canContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.continueText}>Continue to Payment</Text>
              <Lock size={18} color={BLACK} strokeWidth={2} />
            </TouchableOpacity>

            <Text style={styles.secureText}>
              Secure checkout · Your details stay protected
            </Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddMoneyModal;