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
  Home,
  Coffee,
  User,
} from 'lucide-react-native';

import usePaymentViewModel from '../../viewmodels/usePaymentViewModel';
import styles from '../styles/PaymentScreen.styles';

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

  // Bottom Navigation Items
  const navItems = [
    { name: 'Home', icon: Home, active: false },
    { name: 'Bookings', icon: CalendarDays, active: true },
    { name: 'Cafe', icon: Coffee, active: false },
    { name: 'Wallet', icon: Wallet, active: false },
    { name: 'Profile', icon: User, active: false },
  ];

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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={23} color={WHITE} />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Payments</Text>

            {/* <Text style={styles.headerSubtitle}>FITPOD</Text>    */}
          </View>
          <Text style={styles.logoText}>FitPod</Text>
        </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Step indicator */}
        <Text style={styles.stepText}>RESERVATION · 03 / 03</Text>

        <Text style={styles.mainTitle}>
          One step to your space.
        </Text>

        <Text style={styles.subtitle}>
          Review your booking and choose how you want to pay.
        </Text>

        {/* Booking Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BOOKING SUMMARY</Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View style={styles.podIcon}>
                <Text style={styles.podIconText}>FP</Text>
              </View>

              <View style={styles.podInfo}>
                <Text style={styles.podName}>{podName}</Text>

                <Text style={styles.bookingType}>
                  {bookingType} · {duration} {duration === 1 ? 'hour' : 'hours'}
                </Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <CalendarDays size={17} color={GREY} />
                <Text style={styles.detailLabelText}>Date</Text>
              </View>

              <Text style={styles.detailValue}>{formattedDate}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Clock size={17} color={GREY} />
                <Text style={styles.detailLabelText}>Time</Text>
              </View>

              <Text style={styles.detailValue}>
                {selectedTime} – {endTime}
              </Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                {duration} {duration === 1 ? 'hour' : 'hours'} × Rs. {hourlyRate.toLocaleString('en-LK')}
              </Text>

              <Text style={styles.priceValue}>
                Rs. {totalPrice.toLocaleString('en-LK')}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>

              <Text style={styles.totalAmount}>
                Rs. {totalPrice.toLocaleString('en-LK')}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>

          {/* PayHere */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'PAYHERE' && styles.selectedPaymentOption,
            ]}
            onPress={() => selectPaymentMethod('PAYHERE')}
            activeOpacity={0.8}
          >
            <View style={styles.paymentIcon}>
              <CreditCard size={22} color={WHITE} />
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>
                PayHere Card Payment
              </Text>

              <Text style={styles.paymentDescription}>
                Pay securely by debit or credit card
              </Text>
            </View>

            <View
              style={[
                styles.radioOuter,
                paymentMethod === 'PAYHERE' && styles.radioOuterSelected,
              ]}
            >
              {paymentMethod === 'PAYHERE' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>

          {/* Wallet */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'WALLET' && styles.selectedPaymentOption,
            ]}
            onPress={() => selectPaymentMethod('WALLET')}
            activeOpacity={0.8}
          >
            <View style={styles.paymentIcon}>
              <Wallet size={22} color={GREEN} />
            </View>

            <View style={styles.paymentInfo}>
              <Text style={styles.paymentTitle}>In-App Wallet</Text>

              <Text style={styles.paymentDescription}>
                Balance: Rs. {walletBalance.toLocaleString('en-LK')}
              </Text>

              {!hasSufficientBalance && (
                <Text style={styles.insufficientText}>
                  Insufficient balance
                </Text>
              )}
            </View>

            <View
              style={[
                styles.radioOuter,
                paymentMethod === 'WALLET' && styles.radioOuterSelected,
              ]}
            >
              {paymentMethod === 'WALLET' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>

          {/* Wallet remaining balance */}
          {paymentMethod === 'WALLET' && hasSufficientBalance && (
            <View style={styles.remainingBalanceCard}>
              <Text style={styles.remainingLabel}>
                Wallet balance after payment
              </Text>

              <Text style={styles.remainingAmount}>
                Rs. {remainingBalance.toLocaleString('en-LK')}
              </Text>
            </View>
          )}
        </View>

        {/* Booking Hold Information */}
        <View style={styles.holdCard}>
          <View style={styles.holdIcon}>
            <Clock size={19} color={GREEN} />
          </View>

          <View style={styles.holdInfo}>
            <Text style={styles.holdTitle}>
              Temporary booking hold
            </Text>

            <Text style={styles.holdDescription}>
              Your selected time will be held for 5 minutes after the
              booking service confirms the temporary reservation.
            </Text>
          </View>
        </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
          style={[
            styles.confirmButton,
            !canConfirmPayment && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmPayment}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Payment
          </Text>

          <CheckCircle2 size={20} color="#000000" />
        </TouchableOpacity>

        </View>
        

        <Text style={styles.disclaimer}>
          Only the pod rental is included. Cafe items are not included
          in this payment.
        </Text>
      

      {/* Bottom Navigation - Same Structure as HomeScreen */}
      {/* <View style={styles.bottomNavigation}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => goTo(item.name)}
              activeOpacity={0.8}
            >
              <Icon
                size={21}
                color={item.active ? GREEN : WHITE}
                strokeWidth={1.8}
              />

              <Text
                style={[
                  styles.navText,
                  item.active && styles.activeNavText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View> */}
    </SafeAreaView>
  );
};

export default PaymentScreen;
