
import React from 'react';
import Text from '../components/AppText';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ChevronRight,
} from 'lucide-react-native';

import CustomCalendar from '../components/CustomCalendar';
import useBookingViewModel from '../../viewmodels/useBookingViewModel';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';
const MUTED = '#A0A0A0';
const BACKGROUND = '#000000';

const BookingScreen = ({ navigation, route }) => {
  const {
    selectedDate,
    selectedTime,
    duration,
    bookingType,
    totalPrice,
    endTime,
    cleaningEndTime,
    timeSlots,
    selectedSlotIsValid,
    formatDate,
    formatTime,
    selectDate,
    selectTime,
    selectDuration,
    selectBookingType,
  } = useBookingViewModel();

  // Check selected time
  const isSelectedTime = (time) => {
    if (!selectedTime || !time) return false;

    return (
      selectedTime.getHours() === time.getHours() &&
      selectedTime.getMinutes() === time.getMinutes()
    );
  };

  // Continue to Payment
  const handleContinue = () => {
    if (!selectedSlotIsValid) {
      Alert.alert(
        'Select a Time Slot',
        'Please select an available time slot before continuing.'
      );
      return;
    }

    const bookingDetails = {
      selectedPod: route?.params?.selectedPod,
      selectedPodId: route?.params?.selectedPodId,
      selectedDate: formatDate(selectedDate),
      selectedTime: formatTime(selectedTime),
      duration,
      bookingType,
      totalPrice,
    };

    if (bookingType === 'Group') {
      navigation.navigate('GroupInvitation', bookingDetails);
      return;
    }

    navigation.navigate('Payment', bookingDetails);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BACKGROUND,
      }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={BACKGROUND}
      />

      {/* Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-[#303030]">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-[#171717] items-center justify-center"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={23} color={WHITE} />
        </TouchableOpacity>

        <View className="flex-1 ml-4">
          <Text className="text-white text-base font-bold">
            Booking details
          </Text>
        </View>

        <Text className="text-white text-xl font-extrabold">
          FitPod
        </Text>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: BACKGROUND,
        }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 25,
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* Introduction */}
        <View className="mb-6">
          <Text className="text-[#B6FF00] text-[10px] font-bold tracking-widest mb-3">
            RESERVATION · 02 / 03
          </Text>

          <Text className="text-white text-[27px] font-extrabold">
            Reserve your time.
          </Text>

          <Text className="text-[#A0A0A0] text-sm mt-2">
            Make time for you.
          </Text>
        </View>

        {/* Date Selection */}
        <View className="bg-[#171717] rounded-2xl border border-[#303030] p-4 mb-6">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-white text-lg font-bold">
              Select Date
            </Text>

            <CalendarDays size={19} color={GREEN} />
          </View>

          <CustomCalendar
            selectedDate={selectedDate}
            onDateSelect={selectDate}
          />

          <View className="mt-5">
            <Text className="text-[#A0A0A0] text-[10px] font-bold tracking-wider mb-2">
              SELECTED DATE
            </Text>

            <View className="h-12 bg-[#222222] border border-[#303030] rounded-xl px-3 flex-row items-center justify-between">
              <Text className="text-white text-sm">
                {formatDate(selectedDate)}
              </Text>

              <CalendarDays size={17} color={GREEN} />
            </View>
          </View>
        </View>

        {/* Time Selection */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-bold">
              Select Time
            </Text>

            <Text className="text-[#A0A0A0] text-xs">
              Available slots
            </Text>
          </View>

          {timeSlots && timeSlots.length > 0 ? (
            <View className="flex-row flex-wrap gap-2">
              {timeSlots.map((time, index) => {
                const selected = isSelectedTime(time);

                return (
                  <TouchableOpacity
                    key={time.toISOString?.() || index}
                    className={`w-[31%] py-3 rounded-xl items-center justify-center border ${
                      selected
                        ? 'bg-[#B6FF00] border-[#B6FF00]'
                        : 'bg-[#171717] border-[#303030]'
                    }`}
                    onPress={() => selectTime(time)}
                    activeOpacity={0.8}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        selected ? 'text-black' : 'text-white'
                      }`}
                    >
                      {formatTime(time)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View className="bg-[#171717] border border-[#303030] rounded-xl p-4">
              <Text className="text-red-400 text-xs">
                No available slots for this date and duration.
              </Text>
            </View>
          )}
        </View>

        {/* Duration */}
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-4">
            Session Duration
          </Text>

          <View className="flex-row gap-2">
            {[1, 2, 3].map((hours) => {
              const selected = duration === hours;

              return (
                <TouchableOpacity
                  key={hours}
                  className={`flex-1 py-3 rounded-xl items-center border ${
                    selected
                      ? 'bg-[#B6FF00] border-[#B6FF00]'
                      : 'bg-[#171717] border-[#303030]'
                  }`}
                  onPress={() => selectDuration(hours)}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selected ? 'text-black' : 'text-white'
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
        <View className="mb-6">
          <Text className="text-white text-lg font-bold mb-4">
            Booking Type
          </Text>

          <View className="flex-row gap-2">
            {['Individual', 'Group'].map((type) => {
              const selected = bookingType === type;

              return (
                <TouchableOpacity
                  key={type}
                  className={`flex-1 py-3 rounded-xl items-center border ${
                    selected
                      ? 'bg-[#B6FF00] border-[#B6FF00]'
                      : 'bg-[#171717] border-[#303030]'
                  }`}
                  onPress={() => selectBookingType(type)}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selected ? 'text-black' : 'text-white'
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Pod Availability */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-white text-lg font-bold">
                Pod Availability
              </Text>

              <Text className="text-[#A0A0A0] text-xs mt-1">
                Your private fitness space
              </Text>
            </View>

            <Clock size={20} color={GREEN} />
          </View>

          <View className="bg-[#171717] border border-[#303030] rounded-2xl p-4">
            <Text className="text-white text-sm font-bold mb-4">
              Selected Session
            </Text>

            <View className="flex-row justify-between mb-3">
              <Text className="text-[#A0A0A0] text-xs">
                Start
              </Text>

              <Text className="text-white text-xs font-semibold">
                {selectedTime ? formatTime(selectedTime) : '--:--'}
              </Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text className="text-[#A0A0A0] text-xs">
                End
              </Text>

              <Text className="text-white text-xs font-semibold">
                {endTime ? formatTime(endTime) : '--:--'}
              </Text>
            </View>

            <View className="flex-row gap-1 h-2">
              <View className="flex-1 bg-[#B6FF00] rounded-full" />
              <View className="flex-1 bg-[#303030] rounded-full" />
              <View className="flex-1 bg-[#303030] rounded-full" />
              <View className="flex-1 bg-[#303030] rounded-full" />
            </View>

            <Text className="text-[#A0A0A0] text-[10px] mt-3">
              15-minute cleaning and ventilation buffer
            </Text>
          </View>
        </View>

        {/* Booking Information */}
        <View className="bg-[#171717] border border-[#303030] rounded-2xl p-4 mb-6">
          <Text className="text-[#B6FF00] text-sm font-bold mb-2">
            Your space. Your pace.
          </Text>

          <Text className="text-[#A0A0A0] text-xs leading-5">
            Enjoy your workout in a private environment.
            The pod is reserved exclusively for your selected booking.
          </Text>
        </View>

        {/* Price Summary */}
        <View className="mb-5">
          <Text className="text-white text-lg font-bold mb-4">
            Booking Summary
          </Text>

          <View className="bg-[#171717] border border-[#303030] rounded-2xl p-4">
            <View className="flex-row justify-between mb-4">
              <Text className="text-[#A0A0A0] text-xs">
                Date
              </Text>

              <Text className="text-white text-xs font-semibold">
                {formatDate(selectedDate)}
              </Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text className="text-[#A0A0A0] text-xs">
                Start Time
              </Text>

              <Text className="text-white text-xs font-semibold">
                {selectedTime ? formatTime(selectedTime) : '--'}
              </Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text className="text-[#A0A0A0] text-xs">
                End Time
              </Text>

              <Text className="text-white text-xs font-semibold">
                {endTime ? formatTime(endTime) : '--'}
              </Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text className="text-[#A0A0A0] text-xs">
                Duration
              </Text>

              <Text className="text-white text-xs font-semibold">
                {duration} {duration === 1 ? 'Hour' : 'Hours'}
              </Text>
            </View>

            <View className="flex-row justify-between mb-4">
              <Text className="text-[#A0A0A0] text-xs">
                Booking Type
              </Text>

              <Text className="text-white text-xs font-semibold">
                {bookingType}
              </Text>
            </View>

            <View className="border-t border-[#303030] pt-4 mt-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-sm font-bold">
                  Total Price
                </Text>

                <Text className="text-[#B6FF00] text-xl font-extrabold">
                  Rs. {Number(totalPrice || 0).toLocaleString('en-US')}
                </Text>
              </View>

              <Text className="text-[#A0A0A0] text-[10px] mt-3">
                Cleaning buffer ends at{' '}
                {cleaningEndTime
                  ? formatTime(cleaningEndTime)
                  : '--'}
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Continue Button */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 12,
          backgroundColor: BACKGROUND,
          borderTopWidth: 1,
          borderTopColor: '#303030',
        }}
      >
        <TouchableOpacity
          className={`h-14 rounded-xl flex-row items-center justify-center ${
            selectedSlotIsValid
              ? 'bg-[#B6FF00]'
              : 'bg-[#555555]'
          }`}
          onPress={handleContinue}
          disabled={!selectedSlotIsValid}
          activeOpacity={0.85}
        >
          <Text className="text-black font-bold text-sm">
            Continue to Payment
          </Text>

          <ChevronRight
            size={20}
            color={BACKGROUND}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingScreen;
