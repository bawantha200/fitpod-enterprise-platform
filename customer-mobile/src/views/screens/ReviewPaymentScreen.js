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
import styles from '../styles/ReviewPaymentScreen.styles';

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
        {/* Title */}
        <View style={styles.titleRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <ChevronLeft size={26} color={WHITE} strokeWidth={2} />
          </TouchableOpacity>

          <Text style={styles.title}>Review payment</Text>
        </View>

        <Text style={styles.subtitle}>One last look before you top up.</Text>

        {/* Amount */}
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>ADDING TO YOUR WALLET</Text>

          <View style={styles.amountRow}>
            <Text style={styles.amountCurrency}>Rs.</Text>
            <Text style={styles.amountValue}>{amountText}</Text>
          </View>

          <Text style={styles.amountMeta}>LKR · FitPod wallet</Text>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Payment details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Payment method</Text>
            <Text style={styles.detailValue}>PayHere</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total to pay</Text>
            <Text style={styles.totalValue}>Rs. {amountText}</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Your wallet is credited after payment is confirmed.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (isProcessing || amount <= 0) && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={isProcessing || amount <= 0}
          activeOpacity={0.85}
        >
          {isProcessing ? (
            <ActivityIndicator color={BACKGROUND} />
          ) : (
            <>
              <Text style={styles.confirmText}>Confirm Payment</Text>
              <Lock size={18} color={BACKGROUND} strokeWidth={2} />
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.footnote}>
          {isDemoMode
            ? 'Demo checkout · No money will be charged.'
            : 'Secure checkout · Processed by PayHere'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ReviewPaymentScreen;