
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Bell,
  UserRound,
  Home,
  CalendarDays,
  Coffee,
  Wallet,
  User,
  Clock,
  ChevronRight,
  MessageCircle,
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useHomeViewModel from '../../viewmodels/useHomeViewModel';
import CustomCalendar from '../components/CustomCalendar';
import styles from '../styles/HomeScreen.styles';

const GREEN = '#B6FF00';
const BACKGROUND = '#1c1111';
const MUTED = '#A0A0A0';
const WHITE = '#FFFFFF';

const navItems = [
  { name: 'Home', icon: Home, active: true },
  { name: 'Bookings', icon: CalendarDays },
  { name: 'Cafe', icon: Coffee },
  { name: 'Wallet', icon: Wallet },
  { name: 'Profile', icon: User },
];

const formatPrice = (price) =>
  `Rs. ${price.toLocaleString('en-US')}`;

const HomeScreen = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    welcomeMessage,
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

  const goTo = (screenName) => {
    if (screenName === 'Home') return;

    const routeNames =
      navigation?.getState?.()?.routeNames || [];

    if (routeNames.includes(screenName)) {
      navigation.navigate(screenName);
    } else {
      console.log(`${screenName} screen is not connected yet`);
    }
  };

  const handleContinue = () => {
    if (!selectedSlotIsValid) {
      Alert.alert(
        'Select a time slot',
        'Please select a valid available start time.'
      );

      setShowTimePicker(true);
      return;
    }

    navigation.navigate('Booking', {
      selectedDate: formatDate(selectedDate),
      selectedTime: formatTime(selectedTime),
      duration,
      bookingType,
      totalPrice,
    });
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={BACKGROUND}
      />

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
                onPress={() =>
                  console.log('Notifications coming soon')
                }
              >
                <Bell size={21} color={WHITE} strokeWidth={1.8} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => goTo('Profile')}
              >
                <UserRound
                  size={21}
                  color={WHITE}
                  strokeWidth={1.8}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome */}
          <View style={styles.welcomeRow}>
            <View>
              <Text style={styles.welcomeEyebrow}>
                Welcome Back!
              </Text>

              <Text style={styles.welcomeName}>
                Nethmi Perera
              </Text>
            </View>

            <View style={styles.tag}>
              <Text style={styles.tagText}>
                YOUR SPACE. YOUR PACE.
              </Text>
            </View>
          </View>

          {/* Hero Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerOverlay} />

            <Text style={styles.bannerTitle}>
              Big energy. Just your space.
            </Text>
          </View>

          {/* Pod Information */}
          <View style={styles.podSection}>
            <Text style={styles.podTitle}>
              {pod?.name || 'FitPod Private Fitness Pod'}
            </Text>

            <Text style={styles.podDescription}>
              Up to 4 · Treadmill · Dumbbells · Bench · Mat
            </Text>

            <View style={styles.podPriceRow}>
              <Text style={styles.podPrice}>
                {pod?.price || 'Rs. 2,000'} / hour
              </Text>

              <Text style={styles.sampleRate}>
                Sample rate · editable
              </Text>
            </View>
          </View>

          {/* Booking Card */}
          <View style={styles.bookingCard}>
            <View style={styles.cardHeadingRow}>
              <Text style={styles.bookingTitle}>
                Book Your Pod
              </Text>

              <CalendarDays
                size={19}
                color={GREEN}
                strokeWidth={1.8}
              />
            </View>

            {/* Date and Start Time */}
            <View style={styles.twoColumns}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>Date</Text>

                <TouchableOpacity
                  style={styles.fieldBox}
                  onPress={() => {
                    setShowCalendar(!showCalendar);
                    setShowTimePicker(false);
                  }}
                >
                  <Text style={styles.fieldValue}>
                    {formatDate(selectedDate)}
                  </Text>

                  <CalendarDays size={16} color={MUTED} />
                </TouchableOpacity>
              </View>

              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel}>
                  Start Time
                </Text>

                <TouchableOpacity
                  style={[
                    styles.fieldBox,
                    !selectedSlotIsValid && styles.invalidField,
                  ]}
                  onPress={() => {
                    setShowTimePicker(!showTimePicker);
                    setShowCalendar(false);
                  }}
                >
                  <Text style={styles.fieldValue}>
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
              <CustomCalendar
                selectedDate={selectedDate}
                onDateSelect={(date) => {
                  handleDateChange(date);
                  setShowCalendar(false);
                  setShowTimePicker(false);
                }}
              />
            )}

            {/* Fixed Time Slots */}
            {showTimePicker && (
              <View style={styles.timeSlotContainer}>
                <Text style={styles.fieldLabel}>
                  Available Start Times
                </Text>

                <Text style={styles.slotInfo}>
                  Select a fixed time slot for your {duration}-hour
                  booking.
                </Text>

                {timeSlots.length > 0 ? (
                  <View style={styles.timeSlotGrid}>
                    {timeSlots.map((time) => {
                      const selected =
                        selectedTime.getHours() === time.getHours() &&
                        selectedTime.getMinutes() === time.getMinutes();

                      return (
                        <TouchableOpacity
                          key={time.toISOString()}
                          style={[
                            styles.timeSlot,
                            selected && styles.timeSlotSelected,
                          ]}
                          onPress={() => {
                            handleTimeSelect(time);
                            setShowTimePicker(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.timeSlotText,
                              selected &&
                                styles.timeSlotSelectedText,
                            ]}
                          >
                            {formatTime(time)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={styles.noSlotsText}>
                    No available slots for this date and duration.
                    Please select another date.
                  </Text>
                )}
              </View>
            )}

            {/* Duration */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Duration</Text>

              <View style={styles.segmentRow}>
                {[1, 2, 3].map((hours) => {
                  const selected = duration === hours;

                  return (
                    <TouchableOpacity
                      key={hours}
                      style={[
                        styles.segment,
                        selected && styles.segmentSelected,
                      ]}
                      onPress={() => {
                        handleDurationChange(hours);
                        setShowTimePicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.segmentText,
                          selected && styles.segmentTextSelected,
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
            <View style={styles.segmentRow}>
              {['Individual', 'Group'].map((type) => {
                const selected = bookingType === type;

                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.segment,
                      selected && styles.segmentSelected,
                    ]}
                    onPress={() => setBookingType(type)}
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        selected && styles.segmentTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Booking Summary */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalDuration}>
                  {duration} {duration === 1 ? 'Hour' : 'Hours'}
                  {' · '}Ends {formatTime(endTime)}
                </Text>

                <Text style={styles.totalPrice}>
                  {formatPrice(totalPrice)}
                </Text>
              </View>

              <Text style={styles.cleaningInfo}>
                15 min cleaning after booking · Until{' '}
                {formatTime(cleaningEndTime)}
              </Text>

              {duration > 1 && (
                <Text style={styles.slotInfo}>
                  Includes {(duration - 1) * 15} min extra time
                  between slots.
                </Text>
              )}
            </View>

            {/* Continue */}
            <TouchableOpacity
              style={[
                styles.primaryButton,
                !selectedSlotIsValid && styles.disabledButton,
              ]}
              onPress={handleContinue}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryButtonText}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Your next private session
            </Text>

            <View style={styles.upcomingCard}>
              <View style={styles.badgesRow}>
                <View style={styles.outlineBadge}>
                  <Text style={styles.outlineBadgeText}>
                    UPCOMING
                  </Text>
                </View>

                <View style={styles.outlineBadge}>
                  <Text style={styles.outlineBadgeText}>
                    PAID
                  </Text>
                </View>
              </View>

              <Text style={styles.upcomingTitle}>
                FitPod Private Fitness Pod
              </Text>

              <Text style={styles.upcomingDate}>
                Fri 30 Oct 2026 · 06:15 PM–08:15 PM
              </Text>

              <View style={styles.upcomingMetaRow}>
                <Text style={styles.upcomingMeta}>
                  Individual · 2 hours
                </Text>

                <Text style={styles.upcomingAmount}>
                  Rs. 4,000
                </Text>
              </View>

              <Text style={styles.bookingReference}>
                FP-261030-014
              </Text>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => goTo('Bookings')}
                activeOpacity={0.85}
              >
                <Text style={styles.secondaryButtonText}>
                  View Booking
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cafe */}
          <View style={styles.section}>
            <View style={styles.sectionHeadingRow}>
              <Text style={styles.sectionTitle}>
                Fuel your next move
              </Text>

              <TouchableOpacity onPress={() => goTo('Cafe')}>
                <Text style={styles.viewAll}>VIEW ALL</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cafeRow}>
              {(cafeItems?.length
                ? cafeItems.slice(0, 2)
                : [
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
                  ]
              ).map((item, index) => (
                <TouchableOpacity
                  key={item.id || item.name || index}
                  style={styles.cafeItem}
                  onPress={() => goTo('Cafe')}
                  activeOpacity={0.9}
                >
                  <View style={styles.cafeImage}>
                    <Text style={styles.cafeEmoji}>
                      {item.emoji || (index === 0 ? '🥤' : '🥣')}
                    </Text>
                  </View>

                  <Text style={styles.cafeName} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={styles.cafePrice}>
                    {item.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Customer Support Assistant */}
          <TouchableOpacity
            style={styles.assistantCard}
            onPress={() => goTo('Chatbot')}
            activeOpacity={0.88}
          >
            <View style={styles.assistantIcon}>
              <MessageCircle
                size={21}
                color={GREEN}
                strokeWidth={1.9}
              />
            </View>

            <View style={styles.assistantTextWrap}>
              <Text style={styles.assistantTitle}>
                Need a hand?
              </Text>

              <Text style={styles.assistantDescription}>
                Chat with our FitPod assistant about bookings,
                payments and more.
              </Text>
            </View>

            <ChevronRight size={20} color={GREEN} />
          </TouchableOpacity>

          {/* Inside FitPod Updates */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Inside FitPod
            </Text>

            {updates?.length ? (
              updates.slice(0, 2).map((item, index) => (
                <View
                  style={styles.updateCard}
                  key={item.id || index}
                >
                  <Text style={styles.updateEyebrow}>
                    {index === 0
                      ? 'WHAT’S NEW · 27 OCT'
                      : 'CAFE UPDATE'}
                  </Text>

                  <Text style={styles.updateTitle}>
                    {item.title}
                  </Text>

                  <Text style={styles.updateDescription}>
                    {item.description}
                  </Text>
                </View>
              ))
            ) : (
              <>
                <View style={styles.updateCard}>
                  <Text style={styles.updateEyebrow}>
                    WHAT’S NEW · 27 OCT
                  </Text>

                  <Text style={styles.updateTitle}>
                    Your time, down to the minute.
                  </Text>

                  <Text style={styles.updateDescription}>
                    Choose your preferred time slot, invite your
                    friends and make the pod yours.
                  </Text>
                </View>

                <View style={styles.updateCard}>
                  <Text style={styles.updateEyebrow}>
                    CAFE UPDATE
                  </Text>

                  <Text style={styles.updateTitle}>
                    Meet your post-workout favorites.
                  </Text>

                  <Text style={styles.updateDescription}>
                    Protein smoothies and fresh energy bowls
                    are now on the menu.
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Backend Status */}
          <Text style={styles.connectionStatus}>
            Backend: {connectionStatus}
          </Text>
        </ScrollView>

        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
