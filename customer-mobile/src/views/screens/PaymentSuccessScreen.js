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
import styles from '../styles/PaymentSuccessScreen.styles';

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

  // Android back button -> Wallet (not back into the payment flow)
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
      style={styles.safeArea}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Text style={styles.logo}>FitPod</Text>
          <View style={styles.logoDot} />
        </View>

        <View style={styles.headerActions}>
          <Bell size={21} color={WHITE} strokeWidth={1.8} />
          <UserRound size={21} color={WHITE} strokeWidth={1.8} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.badgeOuter}>
          <View style={styles.badgeInner}>
            <Check size={34} color={BACKGROUND} strokeWidth={3} />
          </View>
        </View>

        <Text style={styles.title}>Wallet topped up!</Text>
        <Text style={styles.subtitle}>You’re all set for your next session.</Text>

        {/* Receipt */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptLabelSmall}>AMOUNT ADDED</Text>

          <View style={styles.amountRow}>
            <Text style={styles.amountCurrency}>Rs.</Text>
            <Text style={styles.amountValue}>{formatNumber(amount)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Paid with</Text>
            <Text style={styles.rowValue}>PayHere</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Status</Text>
            <Text style={styles.rowValueSuccess}>Successful</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.balanceLabel}>New wallet balance</Text>
            <Text style={styles.balanceValue}>Rs. {formatNumber(newBalance)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={goToWallet}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Back to Wallet</Text>
        </TouchableOpacity>

        {isDemoMode && (
          <Text style={styles.footnote}>
            Demo receipt · For interaction preview only
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccessScreen;