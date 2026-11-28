
import React, { useState } from 'react';
import Text from '../components/AppText';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Bell,
  UserRound,
  CalendarDays,
  Clock,
  ChevronRight,
  MessageCircle,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useHomeViewModel from '../../viewmodels/useHomeViewModel';
import CustomCalendar from '../components/CustomCalendar';

const GREEN = '#B6FF00';
const BACKGROUND = '#000000';
const WHITE = '#FFFFFF';
const MUTED = '#A0A0A0';

const formatPrice = (price) =>
  `Rs. ${Number(price).toLocaleString('en-US')}`;

const HomeScreen = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    connectionStatus,
    pod,
    cafeItems,
    updates,
    selectedDate,
    selectedTime,
    duration,
    bookingType,
    setBookingType,
    totalPrice,
    endTime,
    cleaningEndTime,
    timeSlots,
    selectedSlotIsValid,
    handleDateChange,
    handleDurationChange,
    handleTimeSelect,
    formatDate,
    formatTime,
  } = useHomeViewModel();

  // Navigation
  const goTo = (screenName) => {
    if (screenName === 'Home') return;

    const tabRoutes = ['Home', 'Bookings', 'Wallet'];

    if (tabRoutes.includes(screenName)) {
      navigation.navigate(screenName);
      return;
    }

    const rootNavigation = navigation.getParent();
    const rootRoutes =
      rootNavigation?.getState?.()?.routeNames || [];

    if (rootRoutes.includes(screenName)) {
      rootNavigation.navigate(screenName);
    } else {
      console.log(`${screenName} screen is not connected yet`);
    }
  };

  // Continue booking
  const handleContinue = () => {
    if (!selectedSlotIsValid) {
      Alert.alert(
        'Select a time slot',
        'Please select a valid available start time.'
      );

      setShowTimePicker(true);
      return;
    }

    navigation.getParent()?.navigate('Booking', {
      selectedDate: formatDate(selectedDate),
      selectedTime: formatTime(selectedTime),
      duration,
      bookingType,
      totalPrice,
    });
  };

  // Cafe fallback data
  const fallbackCafeItems = [
    {
      id: 'smoothie',
      name: 'Protein smoothie',
      price: 'Rs. 650',
      emoji: '🥤',
    },
    {
      id: 'bowl',
      name: 'Energy bowl',
      price: 'Rs. 900',
      emoji: '🥣',
    },
  ];

  const displayCafeItems = cafeItems?.length
    ? cafeItems.slice(0, 2)
    : fallbackCafeItems;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BACKGROUND,
      }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={BACKGROUND}
      />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: BACKGROUND,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}
      >

        {/* Header */}
        <View className="flex-row items-center justify-between pt-4 pb-6">
          <View className="flex-row items-center">
            <Text className="text-white text-[27px] font-extrabold tracking-tight">
              FitPod
            </Text>

            <View className="w-[7px] h-[7px] rounded-full bg-[#B6FF00] ml-1 mt-3" />
          </View>

          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-[#171717] items-center justify-center border border-[#303030]"
              onPress={() =>
                console.log('Notifications coming soon')
              }
            >
              <Bell size={21} color={WHITE} strokeWidth={1.8} />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-[#171717] items-center justify-center border border-[#303030]"
              onPress={() => goTo('Profile')}
            >
              <UserRound size={21} color={WHITE} strokeWidth={1.8} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome */}
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-[#A0A0A0] text-sm mb-1">
              Welcome Back!
            </Text>

            <Text className="text-white text-[22px] font-bold">
              Nethmi Perera
            </Text>
          </View>

          <View className="bg-[#171717] border border-[#303030] rounded-full px-3 py-2">
            <Text className="text-[#B6FF00] text-[8px] font-bold tracking-wider">
              YOUR SPACE. YOUR PACE.
            </Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View className="h-[155px] rounded-2xl overflow-hidden bg-[#242424] border border-[#303030] justify-end p-5 mb-5">
          <View className="absolute inset-0 bg-[#171717] opacity-60" />

          <Text className="text-white text-[23px] font-extrabold max-w-[230px]">
            Big energy. Just your space.
          </Text>

          <View className="w-10 h-1 bg-[#B6FF00] rounded-full mt-3" />
        </View>

        {/* Pod Information */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold">
            {pod?.name || 'FitPod Private Fitness Pod'}
          </Text>

          <Text className="text-[#A0A0A0] text-xs mt-2">
            Up to 4 · Treadmill · Dumbbells · Bench · Mat
          </Text>

          <View className="flex-row items-center justify-between mt-3">
            <Text className="text-[#B6FF00] text-base font-bold">
              {pod?.price || 'Rs. 2,000'} / hour
            </Text>

            <Text className="text-[#777777] text-[10px]">
              Sample rate · editable
            </Text>
          </View>
        </View>

        {/* Booking Card */}
        <View className="bg-[#171717] rounded-2xl border border-[#303030] p-4 mb-7">

          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-white text-lg font-bold">
              Book Your Pod
            </Text>

            <CalendarDays size={19} color={GREEN} strokeWidth={1.8} />
          </View>

          {/* Date and Start Time */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-[#A0A0A0] text-xs mb-2">
                Date
              </Text>

              <TouchableOpacity
                className="h-12 bg-[#222222] border border-[#303030] rounded-xl px-3 flex-row items-center justify-between"
                onPress={() => {
                  setShowCalendar(!showCalendar);
                  setShowTimePicker(false);
                }}
              >
                <Text className="text-white text-xs">
                  {formatDate(selectedDate)}
                </Text>

                <CalendarDays size={16} color={MUTED} />
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <Text className="text-[#A0A0A0] text-xs mb-2">
                Start Time
              </Text>

              <TouchableOpacity
                className={`h-12 bg-[#222222] border rounded-xl px-3 flex-row items-center justify-between ${
                  selectedSlotIsValid
                    ? 'border-[#303030]'
                    : 'border-red-500'
                }`}
                onPress={() => {
                  setShowTimePicker(!showTimePicker);
                  setShowCalendar(false);
                }}
              >
                <Text className="text-white text-xs">
                  {selectedSlotIsValid
                    ? formatTime(selectedTime)
                    : 'Select a slot'}
                </Text>

                <Clock size={16} color={MUTED} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Custom Calendar */}
          {showCalendar && (
            <View className="mt-4">
              <CustomCalendar
                selectedDate={selectedDate}
                onDateSelect={(date) => {
                  handleDateChange(date);
                  setShowCalendar(false);
                  setShowTimePicker(false);
                }}
              />
            </View>
          )}

          {/* Time Slots */}
          {showTimePicker && (
            <View className="mt-5">
              <Text className="text-white text-sm font-semibold mb-2">
                Available Start Times
              </Text>

              <Text className="text-[#A0A0A0] text-xs mb-3">
                Select a fixed time slot for your {duration}-hour booking.
              </Text>

              {timeSlots.length > 0 ? (
                <View className="flex-row flex-wrap gap-2">
                  {timeSlots.map((time) => {
                    const selected =
                      selectedTime.getHours() === time.getHours() &&
                      selectedTime.getMinutes() === time.getMinutes();

                    return (
                      <TouchableOpacity
                        key={time.toISOString()}
                        className={`w-[30%] py-3 rounded-lg items-center border ${
                          selected
                            ? 'bg-[#B6FF00] border-[#B6FF00]'
                            : 'bg-[#222222] border-[#303030]'
                        }`}
                        onPress={() => {
                          handleTimeSelect(time);
                          setShowTimePicker(false);
                        }}
                      >
                        <Text
                          className={`text-xs font-semibold ${
                            selected
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        >
                          {formatTime(time)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <Text className="text-red-400 text-xs">
                  No available slots for this date and duration.
                  Please select another date.
                </Text>
              )}
            </View>
          )}

          {/* Duration */}
          <View className="mt-5">
            <Text className="text-[#A0A0A0] text-xs mb-3">
              Duration
            </Text>

            <View className="flex-row gap-2">
              {[1, 2, 3].map((hours) => {
                const selected = duration === hours;

                return (
                  <TouchableOpacity
                    key={hours}
                    className={`flex-1 py-3 rounded-lg items-center border ${
                      selected
                        ? 'bg-[#B6FF00] border-[#B6FF00]'
                        : 'bg-[#222222] border-[#303030]'
                    }`}
                    onPress={() => {
                      handleDurationChange(hours);
                      setShowTimePicker(false);
                    }}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        selected
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      {hours} {hours === 1 ? 'Hour' : 'Hours'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Booking Type */}
          <View className="flex-row gap-2 mt-4">
            {['Individual', 'Group'].map((type) => {
              const selected = bookingType === type;

              return (
                <TouchableOpacity
                  key={type}
                  className={`flex-1 py-3 rounded-lg items-center border ${
                    selected
                      ? 'bg-[#B6FF00] border-[#B6FF00]'
                      : 'bg-[#222222] border-[#303030]'
                  }`}
                  onPress={() => setBookingType(type)}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selected
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Booking Summary */}
          <View className="border-t border-[#303030] mt-5 pt-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-xs font-medium">
                {duration} {duration === 1 ? 'Hour' : 'Hours'}
                {' · '}Ends {formatTime(endTime)}
              </Text>

              <Text className="text-[#B6FF00] text-lg font-bold">
                {formatPrice(totalPrice)}
              </Text>
            </View>

            <Text className="text-[#A0A0A0] text-[10px] mt-2">
              15 min cleaning after booking · Until {formatTime(cleaningEndTime)}
            </Text>

            {duration > 1 && (
              <Text className="text-[#A0A0A0] text-[10px] mt-2">
                Includes {(duration - 1) * 15} min extra time between slots.
              </Text>
            )}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className={`mt-5 h-12 rounded-xl flex-row items-center justify-center ${
              selectedSlotIsValid
                ? 'bg-[#B6FF00]'
                : 'bg-[#555555]'
            }`}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text className="text-black font-bold text-sm">
              Continue to Booking
            </Text>

            <ChevronRight
              size={19}
              color={BACKGROUND}
              strokeWidth={2.4}
            />
          </TouchableOpacity>
        </View>

        {/* Upcoming Session */}
        <View className="mb-7">
          <Text className="text-white text-lg font-bold mb-4">
            Your next private session
          </Text>

          <View className="bg-[#171717] border border-[#303030] rounded-2xl p-4">
            <View className="flex-row gap-2 mb-4">
              {['UPCOMING', 'PAID'].map((badge) => (
                <View
                  key={badge}
                  className="border border-[#B6FF00] rounded-full px-3 py-1"
                >
                  <Text className="text-[#B6FF00] text-[9px] font-bold">
                    {badge}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-white text-base font-bold">
              FitPod Private Fitness Pod
            </Text>

            <Text className="text-[#A0A0A0] text-xs mt-2">
              Fri 30 Oct 2026 · 06:15 PM–08:15 PM
            </Text>

            <View className="flex-row justify-between items-center mt-4">
              <Text className="text-[#A0A0A0] text-xs">
                Individual · 2 hours
              </Text>

              <Text className="text-[#B6FF00] font-bold">
                Rs. 4,000
              </Text>
            </View>

            <Text className="text-[#777777] text-[10px] mt-3">
              FP-261030-014
            </Text>

            <TouchableOpacity
              className="mt-4 h-11 rounded-lg border border-[#B6FF00] items-center justify-center"
              onPress={() => goTo('Bookings')}
              activeOpacity={0.85}
            >
              <Text className="text-[#B6FF00] text-xs font-bold">
                View Booking
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Cafe */}
        <View className="mb-7">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-bold">
              Fuel your next move
            </Text>

            <TouchableOpacity onPress={() => goTo('Cafe')}>
              <Text className="text-[#B6FF00] text-[10px] font-bold">
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-3">
            {displayCafeItems.map((item, index) => (
              <TouchableOpacity
                key={item.id || item.name || index}
                className="flex-1 bg-[#171717] border border-[#303030] rounded-xl p-3"
                onPress={() => goTo('Cafe')}
                activeOpacity={0.9}
              >
                <View className="h-24 rounded-lg bg-[#252525] items-center justify-center mb-3">
                  <Text className="text-4xl">
                    {item.emoji || (index === 0 ? '🥤' : '🥣')}
                  </Text>
                </View>

                <Text
                  className="text-white text-xs font-semibold"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text className="text-[#B6FF00] text-xs font-bold mt-2">
                  {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Customer Support Assistant */}
        <TouchableOpacity
          className="flex-row items-center bg-[#171717] border border-[#303030] rounded-2xl p-4 mb-7"
          onPress={() => goTo('Chatbot')}
          activeOpacity={0.88}
        >
          <View className="w-11 h-11 rounded-full bg-[#252525] items-center justify-center">
            <MessageCircle size={21} color={GREEN} strokeWidth={1.9} />
          </View>

          <View className="flex-1 ml-3 mr-2">
            <Text className="text-white font-bold text-sm">
              Need a hand?
            </Text>

            <Text className="text-[#A0A0A0] text-xs mt-1 leading-5">
              Chat with our FitPod assistant about bookings, payments and more.
            </Text>
          </View>

          <ChevronRight size={20} color={GREEN} />
        </TouchableOpacity>

        {/* Inside FitPod Updates */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-4">
            Inside FitPod
          </Text>

          {updates?.length ? (
            updates.slice(0, 2).map((item, index) => (
              <View
                className="bg-[#171717] border border-[#303030] rounded-xl p-4 mb-3"
                key={item.id || index}
              >
                <Text className="text-[#B6FF00] text-[9px] font-bold tracking-wider">
                  {index === 0 ? 'WHAT’S NEW · 27 OCT' : 'CAFE UPDATE'}
                </Text>

                <Text className="text-white text-sm font-bold mt-3">
                  {item.title}
                </Text>

                <Text className="text-[#A0A0A0] text-xs mt-2 leading-5">
                  {item.description}
                </Text>
              </View>
            ))
          ) : (
            <>
              <View className="bg-[#171717] border border-[#303030] rounded-xl p-4 mb-3">
                <Text className="text-[#B6FF00] text-[9px] font-bold tracking-wider">
                  WHAT’S NEW · 27 OCT
                </Text>

                <Text className="text-white text-sm font-bold mt-3">
                  Your time, down to the minute.
                </Text>

                <Text className="text-[#A0A0A0] text-xs mt-2 leading-5">
                  Choose your preferred time slot, invite your friends and make the pod yours.
                </Text>
              </View>

              <View className="bg-[#171717] border border-[#303030] rounded-xl p-4">
                <Text className="text-[#B6FF00] text-[9px] font-bold tracking-wider">
                  CAFE UPDATE
                </Text>

                <Text className="text-white text-sm font-bold mt-3">
                  Meet your post-workout favorites.
                </Text>

                <Text className="text-[#A0A0A0] text-xs mt-2 leading-5">
                  Protein smoothies and fresh energy bowls are now on the menu.
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Backend Status */}
        <Text className="text-[#777777] text-[10px] text-center mb-3">
          Backend: {connectionStatus}
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
