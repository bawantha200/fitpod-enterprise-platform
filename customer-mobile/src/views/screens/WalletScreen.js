import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {
  Bell,
  UserRound,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import AddMoneyModal from '../components/AddMoneyModal';
import useWalletViewModel from '../../viewmodels/useWalletViewModel';
import styles from '../styles/WalletScreen.styles';

const GREEN = '#B6FF00';
const BACKGROUND = '#000000';
const WHITE = '#FFFFFF';

const WalletScreen = ({ navigation }) => {
  const {
    userName,
    balance,
    updatedAt,
    transactions,
    openingBalance,
    openingDate,
    formatPrice,
    handleAddMoney,
    handleViewHistory,
    addMoney,
  } = useWalletViewModel(navigation);

  const goTo = (screenName) => {
    if (screenName === 'Wallet') return;

    const routeNames = navigation?.getState?.()?.routeNames || [];

    if (routeNames.includes(screenName)) {
      navigation.navigate(screenName);
    } else {
      console.log(`${screenName} screen is not connected yet`);
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND} />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <Text style={styles.logo}>FitPod</Text>
              <View style={styles.logoDot} />
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => console.log('Notifications coming soon')}
              >
                <Bell size={21} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => goTo('Profile')}
              >
                <UserRound size={21} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Greeting */}
          <View style={styles.greeting}>
            <Text style={styles.title}>Your wallet.</Text>
            <Text style={styles.subtitle}>
              {userName}, everything in one place.
            </Text>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceTopRow}>
              <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
              <Wallet size={22} color={BACKGROUND} strokeWidth={1.8} />
            </View>

            <Text style={styles.balanceAmount}>{formatPrice(balance)}</Text>

            <Text style={styles.balanceMeta}>LKR · Updated {updatedAt}</Text>
          </View>

          {/* Add Money */}
          <TouchableOpacity
            style={styles.addMoneyButton}
            onPress={handleAddMoney}
            activeOpacity={0.85}
          >
            <Text style={styles.addMoneyText}>Add Money</Text>
            <Plus size={18} color={BACKGROUND} strokeWidth={2.4} />
          </TouchableOpacity>

          {/* Recent Transactions */}
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Recent transactions</Text>

            <TouchableOpacity onPress={handleViewHistory}>
              <Text style={styles.viewAll}>All history</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsCard}>
            {transactions.map((item, index) => {
              const isCredit = item.type === 'credit';
              const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;

              return (
                <React.Fragment key={item.id}>
                  {index > 0 && <View style={styles.divider} />}

                  <View style={styles.transaction}>
                    <View style={styles.transactionTopRow}>
                      <View style={styles.transactionIcon}>
                        <Icon
                          size={18}
                          color={isCredit ? GREEN : WHITE}
                          strokeWidth={1.8}
                        />
                      </View>

                      <View style={styles.transactionTextWrap}>
                        <Text style={styles.transactionTitle}>
                          {item.title}
                        </Text>
                        <Text style={styles.transactionDate}>
                          {item.date}
                        </Text>
                      </View>

                      <Text
                        style={
                          isCredit
                            ? styles.amountCredit
                            : styles.amountDebit
                        }
                      >
                        {isCredit ? '+' : '−'} {formatPrice(item.amount)}
                      </Text>
                    </View>

                    <Text style={styles.transactionReference}>
                      {item.id} · {item.status}
                    </Text>

                    <View style={styles.balanceAfterRow}>
                      <Text style={styles.balanceAfterLabel}>
                        Balance after transaction
                      </Text>
                      <Text style={styles.balanceAfterValue}>
                        {formatPrice(item.balanceAfter)}
                      </Text>
                    </View>
                  </View>
                </React.Fragment>
              );
            })}
          </View>

          <Text style={styles.openingBalance}>
            Opening balance before {openingDate}: {formatPrice(openingBalance)}
          </Text>
        </ScrollView>
      </View>

      <AddMoneyModal {...addMoney} />
    </SafeAreaView>
  );
};

export default WalletScreen;