
import React from 'react';
import Text from '../components/AppText';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowLeft,
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

    navigation.navigate('Booking', {
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
      style={{ flex: 1, backgroundColor: '#000000' }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View className="flex-1 bg-black">

        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-[#252525]">

          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-[#1C1C1C] items-center justify-center"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={23} color={WHITE} />
          </TouchableOpacity>

          <View className="flex-1 items-center">
            <Text className="text-white text-lg font-bold">
              Pod details
            </Text>
          </View>

          <Text className="text-[#B6FF00] text-base font-extrabold">
            FitPod
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1, backgroundColor: '#000000' }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 22,
            paddingBottom: 10,
          }}
          showsVerticalScrollIndicator={false}
        >

          {/* Step Information */}
          <View className="mb-6">
            <Text className="text-[#B6FF00] text-xs font-bold tracking-widest mb-3">
              RESERVATION · 01 / 03
            </Text>

            <Text className="text-white text-3xl font-extrabold mb-2">
              Choose your pod.
            </Text>

            <Text className="text-[#999999] text-sm leading-6">
              Select your private fitness space to continue.
            </Text>
          </View>

          {/* Availability Summary */}
          <View className="flex-row items-center bg-[#151515] border border-[#292929] rounded-xl px-4 py-3 mb-5">
            <View className="w-2.5 h-2.5 rounded-full bg-[#B6FF00] mr-3" />

            <Text className="text-white text-sm font-semibold">
              {availablePodCount} {availablePodCount === 1 ? 'pod' : 'pods'} available
            </Text>
          </View>

          {/* Pod List */}
          <View className="gap-5">

            {pods.map((pod) => {
              const isSelected = selectedPodId === pod.id;
              const isAvailable = pod.status === 'AVAILABLE';

              return (
                <TouchableOpacity
                  key={pod.id}
                  className={`rounded-2xl overflow-hidden border ${
                    isSelected
                      ? 'border-[#B6FF00]'
                      : 'border-[#303030]'
                  } ${!isAvailable ? 'opacity-50' : ''}`}
                  onPress={() => selectPod(pod.id)}
                  disabled={!isAvailable}
                  activeOpacity={0.85}
                >

                  {/* Pod Image Placeholder */}
                  <View className="h-44 bg-[#171717] items-center justify-center relative">

                    <View className="w-20 h-20 rounded-full bg-[#242424] items-center justify-center">
                      <Dumbbell
                        size={42}
                        color={GREEN}
                        strokeWidth={1.5}
                      />
                    </View>

                    {/* Status Badge */}
                    <View className="absolute top-4 left-4 flex-row items-center bg-black/80 rounded-full px-3 py-2">
                      <View
                        className={`w-2 h-2 rounded-full mr-2 ${
                          isAvailable ? 'bg-[#B6FF00]' : 'bg-red-500'
                        }`}
                      />

                      <Text className="text-white text-[10px] font-bold tracking-wider">
                        {isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                      </Text>
                    </View>

                    {/* Selected Icon */}
                    {isSelected && (
                      <View className="absolute top-3 right-3">
                        <CheckCircle2
                          size={27}
                          color={GREEN}
                          fill="#000000"
                        />
                      </View>
                    )}
                  </View>

                  {/* Pod Information */}
                  <View className="bg-[#111111] p-4">

                    {/* Name and ID */}
                    <View className="flex-row items-center justify-between mb-2">
                      <View>
                        <Text className="text-white text-xl font-bold">
                          {pod.name}
                        </Text>

                        <Text className="text-[#777777] text-xs mt-1">
                          {pod.id}
                        </Text>
                      </View>
                    </View>

                    {/* Description */}
                    <Text className="text-[#AAAAAA] text-sm leading-6 mb-4">
                      {pod.description}
                    </Text>

                    {/* Capacity */}
                    <View className="flex-row items-center mb-5">
                      <Users size={17} color={GREEN} />

                      <Text className="text-white text-sm ml-2">
                        Up to {pod.capacity} people
                      </Text>
                    </View>

                    {/* Equipment */}
                    <Text className="text-[#888888] text-[10px] font-bold tracking-widest mb-3">
                      EQUIPMENT & AMENITIES
                    </Text>

                    <View className="flex-row flex-wrap gap-2 mb-5">
                      {pod.equipment.map((equipment, index) => (
                        <View
                          key={`${pod.id}-${index}`}
                          className="bg-[#252525] rounded-lg px-3 py-2"
                        >
                          <Text className="text-[#DDDDDD] text-xs">
                            {equipment}
                          </Text>
                        </View>
                      ))}
                    </View>

                    {/* Price */}
                    <View className="flex-row items-center justify-between border-t border-[#303030] pt-4">
                      <Text className="text-[#999999] text-sm">
                        Hourly rate
                      </Text>

                      <Text className="text-[#B6FF00] text-lg font-extrabold">
                        {formatPrice(pod.hourlyRate)}
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
              );
            })}

          </View>

          {/* Information */}
          <View className="flex-row bg-[#151515] border border-[#303030] rounded-2xl p-4 mt-6">

            <View className="w-10 h-10 rounded-xl bg-[#252525] items-center justify-center mr-3">
              <Users size={20} color={GREEN} />
            </View>

            <View className="flex-1">
              <Text className="text-white text-base font-bold mb-2">
                Your privacy matters
              </Text>

              <Text className="text-[#999999] text-sm leading-6">
                Enjoy your workout in a private space without
                sharing the pod with unfamiliar people.
              </Text>
            </View>

          </View>

        </ScrollView>

        {/* Bottom Continue Button */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 8,
            backgroundColor: '#000000',
            borderTopWidth: 1,
            borderTopColor: '#303030',
          }}
        >
          <TouchableOpacity
            className={`h-14 rounded-xl flex-row items-center justify-center ${
              canContinue ? 'bg-[#B6FF00]' : 'bg-[#555555]'
            }`}
            onPress={handleContinue}
            disabled={!canContinue}
            activeOpacity={0.85}
          >
            <Text className="text-black text-sm font-extrabold mr-2">
              Continue to Date & Time
            </Text>

            <ChevronRight size={21} color="#000000" />
          </TouchableOpacity>
        </View>

      

      </View>
    </SafeAreaView>
  );
};

export default PodDetailsScreen;
