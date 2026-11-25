import React from 'react';
import Text from '../components/AppText';
import {
  View,
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
      style={{ flex: 1, backgroundColor: BACKGROUND }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="light-content" backgroundColor={BACKGROUND} />

      <View className="flex-1 bg-black">
        <ScrollView
          style={{ flex: 1, backgroundColor: BACKGROUND }}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-4">
            <View className="flex-row items-center">
              <Text className="text-[28px] font-extrabold tracking-tight text-white">
                FitPod
              </Text>
              <View className="ml-1.5 h-2 w-2 rounded-full bg-[#B6FF00]" />
            </View>

            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]"
                onPress={() => console.log('Notifications coming soon')}
              >
                <Bell size={21} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>

              <TouchableOpacity
                className="h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]"
                onPress={() => goTo('Profile')}
              >
                <UserRound size={21} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Greeting */}
          <View className="px-6 pb-6 pt-9">
            <Text className="text-[32px] font-extrabold text-white">
              Your wallet.
            </Text>

            <Text className="mt-2 text-sm text-gray-400">
              {userName}, everything in one place.
            </Text>
          </View>

          {/* Balance Card */}
          <View className="mx-6 rounded-[24px] bg-[#B6FF00] p-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-bold tracking-[2px] text-black">
                AVAILABLE BALANCE
              </Text>

              <Wallet size={22} color={BACKGROUND} strokeWidth={1.8} />
            </View>

            <Text className="mt-6 text-[36px] font-extrabold text-black">
              {formatPrice(balance)}
            </Text>

            <Text className="mt-2 text-xs font-medium text-black/60">
              LKR · Updated {updatedAt}
            </Text>
          </View>

          {/* Add Money */}
          <TouchableOpacity
            className="mx-6 mt-5 flex-row items-center justify-center rounded-2xl bg-white py-4"
            onPress={handleAddMoney}
            activeOpacity={0.85}
          >
            <Text className="mr-2 text-base font-bold text-black">
              Add Money
            </Text>

            <Plus size={18} color={BACKGROUND} strokeWidth={2.4} />
          </TouchableOpacity>

          {/* Recent Transactions */}
          <View className="mb-4 mt-9 flex-row items-center justify-between px-6">
            <Text className="text-lg font-bold text-white">
              Recent transactions
            </Text>

            <TouchableOpacity onPress={handleViewHistory}>
              <Text className="text-sm font-semibold text-[#B6FF00]">
                All history
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transactions Card */}
          <View className="mx-6 rounded-[20px] border border-[#262626] bg-[#111111] p-4">
            {transactions.map((item, index) => {
              const isCredit = item.type === 'credit';
              const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;

              return (
                <React.Fragment key={item.id}>
                  {index > 0 && (
                    <View className="my-4 h-px bg-[#292929]" />
                  )}

                  <View>
                    <View className="flex-row items-center">
                      <View
                        className={`mr-3 h-11 w-11 items-center justify-center rounded-full ${
                          isCredit ? 'bg-[#B6FF00]/10' : 'bg-[#262626]'
                        }`}
                      >
                        <Icon
                          size={18}
                          color={isCredit ? GREEN : WHITE}
                          strokeWidth={1.8}
                        />
                      </View>

                      <View className="flex-1">
                        <Text className="text-sm font-bold text-white">
                          {item.title}
                        </Text>

                        <Text className="mt-1 text-xs text-gray-500">
                          {item.date}
                        </Text>
                      </View>

                      <Text
                        className={`text-sm font-bold ${
                          isCredit ? 'text-[#B6FF00]' : 'text-white'
                        }`}
                      >
                        {isCredit ? '+' : '−'} {formatPrice(item.amount)}
                      </Text>
                    </View>

                    <Text className="ml-14 mt-2 text-[11px] text-gray-500">
                      {item.id} · {item.status}
                    </Text>

                    <View className="ml-14 mt-3 flex-row items-center justify-between">
                      <Text className="text-[11px] text-gray-500">
                        Balance after transaction
                      </Text>

                      <Text className="text-xs font-semibold text-gray-300">
                        {formatPrice(item.balanceAfter)}
                      </Text>
                    </View>
                  </View>
                </React.Fragment>
              );
            })}
          </View>

          {/* Opening Balance */}
          <Text className="mx-6 mt-5 text-center text-xs leading-5 text-gray-500">
            Opening balance before {openingDate}:{' '}
            {formatPrice(openingBalance)}
          </Text>
        </ScrollView>
      </View>

      <AddMoneyModal {...addMoney} />
    </SafeAreaView>
  );
};

export default WalletScreen;