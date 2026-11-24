import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import { startPayment, isDemoMode } from '../services/paymentService';


const formatNumber = (value) =>
  Number(value || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const useReviewPaymentViewModel = ({ navigation, route }) => {
  const amount = route?.params?.amount ?? 0;
  const currentBalance = route?.params?.balance ?? 0;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = useCallback(() => {
    if (!isProcessing) navigation.goBack();
  }, [isProcessing, navigation]);

  const handleConfirm = useCallback(async () => {
    if (isProcessing || amount <= 0) return;

    setIsProcessing(true);

    try {
      const result = await startPayment({ amount });

      if (result.status === 'success') {
        // replace => user cannot go "back" into the payment screen
        navigation.replace('PaymentSuccess', {
          amount,
          orderId: result.orderId,
          newBalance: result.newBalance ?? currentBalance + amount,
        });
        return;
      }

      if (result.status === 'pending') {
        Alert.alert(
          'Confirming your payment',
          'Your payment is being confirmed. Your wallet will update shortly.'
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: 'Wallet' } }],
        });
        return;
      }

      // cancelled -> stay on this screen
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      Alert.alert(
        'Payment failed',
        error?.message || 'Something went wrong. Please try again.'
      );
    }
  }, [amount, currentBalance, isProcessing, navigation]);

  return {
    amount,
    amountText: formatNumber(amount),
    isProcessing,
    isDemoMode,
    handleBack,
    handleConfirm,
  };
};

export default useReviewPaymentViewModel;