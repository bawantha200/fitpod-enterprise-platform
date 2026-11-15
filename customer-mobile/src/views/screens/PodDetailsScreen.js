import React from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Coffee,
  Wallet,
  User,
  Dumbbell,
  Users,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react-native';

import usePodDetailsViewModel from '../../viewmodels/usePodDetailsViewModel';
import styles from '../styles/PodDetailsScreen.styles';

const GREEN = '#B6FF00';
const WHITE = '#FFFFFF';

const PodDetailsScreen = ({ navigation }) => {
  const {
    pods,
    selectedPod,
    selectedPodId,
    availablePodCount,
    canContinue,
    selectPod,
    formatPrice,
  } = usePodDetailsViewModel();

  
const handleContinue = () => {
  if (!selectedPod) return;

  navigation.navigate('Bookings', {
    selectedPodId: selectedPod.id,
    selectedPod: selectedPod,
  });
};


  const goTo = (screenName) => {
    const routeNames = navigation.getState()?.routeNames || [];

    if (routeNames.includes(screenName)) {
      navigation.navigate(screenName);
    }
  };

  const navItems = [
    { name: 'Home', icon: CalendarDays, active: false },
    { name: 'Bookings', icon: CalendarDays, active: true },
    { name: 'Cafe', icon: Coffee, active: false },
    { name: 'Wallet', icon: Wallet, active: false },
    { name: 'Profile', icon: User, active: false },
  ];

  return (
    <SafeAreaView 
        style={styles.safeArea}
        edges={['top', 'left', 'right', 'bottom']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <View style={styles.screen}>

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
            <Text style={styles.headerTitle}>Pod details</Text>

            {/* <Text style={styles.headerSubtitle}>FITPOD</Text>    */}
          </View>
          <Text style={styles.logoText}>FitPod</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Step Information */}
          <View style={styles.intro}>
            <Text style={styles.stepText}>
              RESERVATION · 01 / 03
            </Text>

            <Text style={styles.mainTitle}>
              Choose your pod.
            </Text>

            <Text style={styles.sectionHint}>
              Select your private fitness space to continue.
            </Text>
          </View>

          {/* Availability Summary */}
          <View style={styles.availabilitySummary}>
            <View style={styles.availabilityDot} />

            <Text style={styles.availabilityText}>
              {availablePodCount} {availablePodCount === 1 ? 'pod' : 'pods'} available
            </Text>
          </View>

          {/* Pod List */}
          <View style={styles.podList}>

            {pods.map((pod) => {
              const isSelected = selectedPodId === pod.id;
              const isAvailable = pod.status === 'AVAILABLE';

              return (
                <TouchableOpacity
                  key={pod.id}
                  style={[
                    styles.podCard,
                    isSelected && styles.selectedPodCard,
                    !isAvailable && styles.unavailablePodCard,
                  ]}
                  onPress={() => selectPod(pod.id)}
                  disabled={!isAvailable}
                  activeOpacity={0.85}
                >

                  {/* Pod Image Placeholder */}
                  <View style={styles.podImageArea}>
                    <View style={styles.podImageIcon}>
                      <Dumbbell
                        size={42}
                        color={GREEN}
                        strokeWidth={1.5}
                      />
                    </View>

                    <View
                      style={[
                        styles.statusBadge,
                        !isAvailable && styles.unavailableBadge,
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          !isAvailable && styles.unavailableDot,
                        ]}
                      />

                      <Text style={styles.statusText}>
                        {isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                      </Text>
                    </View>

                    {isSelected && (
                      <View style={styles.selectedIcon}>
                        <CheckCircle2
                          size={25}
                          color={GREEN}
                          fill="#000000"
                        />
                      </View>
                    )}
                  </View>

                  {/* Pod Information */}
                  <View style={styles.podInfo}>

                    <View style={styles.podTitleRow}>
                      <View style={styles.podTitleContainer}>
                        <Text style={styles.podName}>
                          {pod.name}
                        </Text>

                        <Text style={styles.podId}>
                          {pod.id}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.podDescription}>
                      {pod.description}
                    </Text>

                    {/* Capacity */}
                    <View style={styles.capacityRow}>
                      <Users size={17} color={GREEN} />

                      <Text style={styles.capacityText}>
                        Up to {pod.capacity} people
                      </Text>
                    </View>

                    {/* Equipment */}
                    <Text style={styles.equipmentTitle}>
                      EQUIPMENT & AMENITIES
                    </Text>

                    <View style={styles.equipmentContainer}>
                      {pod.equipment.map((equipment, index) => (
                        <View
                          key={`${pod.id}-${index}`}
                          style={styles.equipmentTag}
                        >
                          <Text style={styles.equipmentText}>
                            {equipment}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Price */}
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceLabel}>
                        Hourly rate
                      </Text>

                      <Text style={styles.priceValue}>
                        {formatPrice(pod.hourlyRate)}
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
              );
            })}

          </View>

          {/* Information */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Users size={20} color={GREEN} />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Your privacy matters
              </Text>

              <Text style={styles.infoDescription}>
                Enjoy your workout in a private space without
                sharing the pod with unfamiliar people.
              </Text>
            </View>
          </View>

          <View style={styles.bottomSpace} />

        </ScrollView>

        {/* Bottom Continue Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !canContinue && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!canContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueText}>
              Continue to Date & Time
            </Text>

            <ChevronRight size={21} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
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
                    styles.navLabel,
                    item.active && styles.navLabelActive,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default PodDetailsScreen;
