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
  Bell,
  CalendarDays,
  Clock,
  ChevronRight,
  Home,
  Coffee,
  Wallet,
  User,
} from 'lucide-react-native';

import CustomCalendar from '../components/CustomCalendar';
import useBookingViewModel from '../../viewmodels/useBookingViewModel';
import styles from '../styles/BookingScreen.styles';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';

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

  // Bottom Navigation Items
  const navItems = [
    { name: 'Home', icon: Home, active: false },
    { name: 'Bookings', icon: CalendarDays, active: true },
    { name: 'Cafe', icon: Coffee, active: false },
    { name: 'Wallet', icon: Wallet, active: false },
    { name: 'Profile', icon: User, active: false },
  ];

  // Navigate Between Screens
  const goTo = (screenName) => {
    const routeNames = navigation?.getState?.()?.routeNames || [];

    if (routeNames.includes(screenName)) {
      navigation.navigate(screenName);
    }
  };

  // Check Selected Time
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
      style={styles.safeArea}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

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
            <Text style={styles.headerTitle}>Booking details</Text>

            {/* <Text style={styles.headerSubtitle}>FITPOD</Text>    */}
          </View>
          <Text style={styles.logoText}>FitPod</Text>
        </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.intro}>
          <Text style={styles.stepText}>RESERVATION · 02 / 03</Text>

          <Text style={styles.mainTitle}>
            Reserve your time.
          </Text>

          <Text style={styles.sectionHint}>
            Make time for you.
          </Text>
        </View>

        {/* Date Selection */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Select Date
            </Text>

            <CalendarDays size={19} color={GREEN} />
          </View>

          <CustomCalendar
            selectedDate={selectedDate}
            onDateSelect={selectDate}
          />

          <View style={styles.selectedDateContainer}>
            <Text style={styles.fieldLabel}>
              SELECTED DATE
            </Text>

            <View style={styles.dateInput}>
              <Text style={styles.inputValue}>
                {formatDate(selectedDate)}
              </Text>

              <CalendarDays size={17} color={GREEN} />
            </View>
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Select Time
            </Text>

            <Text style={styles.sectionHint}>
              Available slots
            </Text>
          </View>

          <View style={styles.slotGrid}>
            {timeSlots && timeSlots.length > 0 ? (
              timeSlots.map((time, index) => {
                const selected = isSelectedTime(time);

                return (
                  <TouchableOpacity
                    key={time.toISOString?.() || index}
                    style={[
                      styles.timeSlot,
                      selected && styles.selectedTimeSlot,
                    ]}
                    onPress={() => selectTime(time)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selected && styles.selectedTimeSlotText,
                      ]}
                    >
                      {formatTime(time)}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.emptyText}>
                No available slots for this date and duration.
              </Text>
            )}
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Session Duration
            </Text>
          </View>

          <View style={styles.optionContainer}>
            {[1, 2, 3].map((hours) => {
              const selected = duration === hours;

              return (
                <TouchableOpacity
                  key={hours}
                  style={[
                    styles.option,
                    selected && styles.activeOption,
                  ]}
                  onPress={() => selectDuration(hours)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.activeOptionText,
                    ]}
                  >
                    {hours} {hours === 1 ? 'Hour' : 'Hours'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Booking Type */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Booking Type
            </Text>
          </View>

          <View style={styles.optionContainer}>
            {['Individual', 'Group'].map((type) => {
              const selected = bookingType === type;

              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.bookingTypeOption,
                    selected && styles.activeOption,
                  ]}
                  onPress={() => selectBookingType(type)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.activeOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Pod Availability */}
        <View style={styles.section}>
          <View style={styles.podHeader}>
            <View>
              <Text style={styles.podTitle}>
                Pod Availability
              </Text>

              <Text style={styles.podDescription}>
                Your private fitness space
              </Text>
            </View>

            <Clock size={20} color={GREEN} />
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Selected Session
              </Text>

              <View style={styles.occupancyLabels}>
                <Text style={styles.occupancyTime}>
                  {selectedTime
                    ? formatTime(selectedTime)
                    : '--:--'}
                </Text>

                <Text style={styles.occupancyTime}>
                  {endTime
                    ? formatTime(endTime)
                    : '--:--'}
                </Text>
              </View>

              <View style={styles.occupancyBar}>
                <View
                  style={[
                    styles.occupancySegment,
                    styles.bookedSegment,
                  ]}
                />

                <View style={styles.occupancySegment} />
                <View style={styles.occupancySegment} />
                <View style={styles.occupancySegment} />
              </View>

              <Text style={styles.occupancyDescription}>
                15-minute cleaning and ventilation buffer
              </Text>
            </View>
          </View>
        </View>

        {/* Booking Information */}
        <View style={styles.section}>
          <View style={styles.infoCard}>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Your space. Your pace.
              </Text>

              <Text style={styles.infoDescription}>
                Enjoy your workout in a private environment.
                The pod is reserved exclusively for your
                selected booking.
              </Text>
            </View>
          </View>
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Booking Summary
          </Text>

          <View style={styles.card}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Date</Text>
              <Text style={styles.priceValue}>
                {formatDate(selectedDate)}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Start Time</Text>
              <Text style={styles.priceValue}>
                {selectedTime ? formatTime(selectedTime) : '--'}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>End Time</Text>
              <Text style={styles.priceValue}>
                {endTime ? formatTime(endTime) : '--'}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Duration</Text>
              <Text style={styles.priceValue}>
                {duration} {duration === 1 ? 'Hour' : 'Hours'}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Booking Type</Text>
              <Text style={styles.priceValue}>
                {bookingType}
              </Text>
            </View>

            <View style={styles.priceDivider} />

            <View style={styles.priceRow}>
              <Text style={styles.totalPrice}>Total Price</Text>

              <Text style={styles.totalPrice}>
                Rs. {Number(totalPrice || 0).toLocaleString('en-US')}
              </Text>
            </View>

            <Text style={styles.occupancyDescription}>
              Cleaning buffer ends at{' '}
              {cleaningEndTime
                ? formatTime(cleaningEndTime)
                : '--'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedSlotIsValid && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedSlotIsValid}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>
            Continue to Payment
          </Text>

          <ChevronRight size={20} color="#000000" />
        </TouchableOpacity>
      </View>

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

export default BookingScreen;
