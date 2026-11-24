
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Shared bottom nav bar
import Navbar from '../views/components/NavigationBar';

// Screens
import LoginScreen from '../views/screens/LoginScreen';
import RegistrationScreen from '../views/screens/RegistrationScreen';

import HomeScreen from '../views/screens/HomeScreen';
import BookingScreen from '../views/screens/BookingScreen';
import PodDetailsScreen from '../views/screens/PodDetailsScreen';
import GroupInvitationScreen from '../views/screens/GroupInvitationScreen';
import PaymentScreen from '../views/screens/PaymentScreen';
import WalletScreen from '../views/screens/WalletScreen';
import ReviewPaymentScreen from '../views/screens/ReviewPaymentScreen';
import PaymentSuccessScreen from '../views/screens/PaymentSuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main screens with bottom navigation
const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <Navbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Bookings"
        component={PodDetailsScreen}
      />

      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
      />
    </Tab.Navigator>
  );
};

// Main application navigation
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Login Screen */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      {/* Registration Screen */}
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
      />

      {/* Main Application */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
      />

      <Stack.Screen
        name="PodDetials"
        component={PodDetailsScreen}
      />

      <Stack.Screen
        name="Booking"
        component={BookingScreen}
      />

      <Stack.Screen
        name="GroupInvitation"
        component={GroupInvitationScreen}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
      />

      <Stack.Screen
        name="ReviewPayment"
        component={ReviewPaymentScreen}
      />

      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
