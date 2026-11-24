import { useState, useCallback } from 'react';

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000];
const DEFAULT_AMOUNT = 2000;

// Sample data. Later, replace with a call from services/api/apiClient.js
const INITIAL_TRANSACTIONS = [
  {
    id: 'FP-261030-014',
    type: 'debit',
    title: 'Pod booking · Individual',
    date: '27 Oct 2026 · 09:36 AM',
    amount: 4000,
    status: 'Successful',
    balanceAfter: 6500,
  },
  {
    id: 'WT-261027-006',
    type: 'credit',
    title: 'Wallet top-up',
    date: '27 Oct 2026 · 09:30 AM',
    amount: 10000,
    status: 'Successful',
    balanceAfter: 10500,
  },
  {
    id: 'FP-261024-009',
    type: 'debit',
    title: 'Pod booking · Completed',
    date: '24 Oct 2026 · 10:00 AM',
    amount: 2000,
    status: 'Successful',
    balanceAfter: 500,
  },
  {
    id: 'WT-261023-004',
    type: 'credit',
    title: 'Wallet top-up',
    date: '23 Oct 2026 · 06:20 PM',
    amount: 2500,
    status: 'Successful',
    balanceAfter: 2500,
  },
];

const useWalletViewModel = (navigation) => {
  const [userName] = useState('Nethmi');
  const [balance] = useState(6500);
  const [updatedAt] = useState('27 Oct 2026, 09:36 AM');
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [openingBalance] = useState(0);
  const [openingDate] = useState('23 Oct 2026');

  // Add Money sheet state
  const [isAddMoneyVisible, setIsAddMoneyVisible] = useState(false);
  const [amountText, setAmountText] = useState(String(DEFAULT_AMOUNT));
  const [isCustom, setIsCustom] = useState(false);

  const amount = Number(amountText) || 0;
  const canContinue = amount > 0;

  const formatPrice = useCallback(
    (value) =>
      `Rs. ${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    []
  );

  const openAddMoney = useCallback(() => {
    setAmountText(String(DEFAULT_AMOUNT));
    setIsCustom(false);
    setIsAddMoneyVisible(true);
  }, []);

  const closeAddMoney = useCallback(() => {
    setIsAddMoneyVisible(false);
  }, []);

  const handleSelectPreset = useCallback((value) => {
    setAmountText(String(value));
    setIsCustom(false);
  }, []);

  const handleSelectCustom = useCallback(() => {
    setAmountText('');
    setIsCustom(true);
  }, []);

  const handleChangeAmount = useCallback((text) => {
    const digits = text.replace(/\D/g, '').replace(/^0+/, '').slice(0, 7);
    setAmountText(digits);
    setIsCustom(!PRESET_AMOUNTS.includes(Number(digits)));
  }, []);

  const handleContinueToPayment = useCallback(() => {
    if (amount <= 0) return;

    setIsAddMoneyVisible(false);
    navigation.navigate('ReviewPayment', { amount, balance });
  }, [amount, balance, navigation]);

  const handleViewHistory = useCallback(() => {
    // TODO: navigate to full transaction history screen
    console.log('All history coming soon');
  }, []);

  return {
    userName,
    balance,
    updatedAt,
    transactions,
    openingBalance,
    openingDate,
    formatPrice,
    handleViewHistory,
    // "Add Money" button on the wallet screen
    handleAddMoney: openAddMoney,
    // props for <AddMoneyModal />
    addMoney: {
      visible: isAddMoneyVisible,
      onClose: closeAddMoney,
      presets: PRESET_AMOUNTS,
      amountText,
      amount,
      isCustom,
      canContinue,
      onSelectPreset: handleSelectPreset,
      onSelectCustom: handleSelectCustom,
      onChangeAmount: handleChangeAmount,
      onContinue: handleContinueToPayment,
    },
  };
};

export default useWalletViewModel;