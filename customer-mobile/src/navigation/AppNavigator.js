import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Shared bottom nav bar
import Navbar from '../views/components/NavigationBar';

// Screens
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

// Screens that share the bottom nav bar (order = tab bar order)
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

      {/* Add these later when the screens are ready: */}
      <Tab.Screen 
      name="Bookings" 
      component={PodDetailsScreen} 
      />

      {/* <Tab.Screen name="Cafe" component={CafeScreen} /> */}
     

      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
      />

      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
      />

      <Stack.Screen
        name="PodDetials"
        component={PodDetailsScreen}
      />

      {/* Opens on top of the tabs (no bottom nav bar) */}
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

      {/* Wallet top-up flow (no bottom nav bar) */}
      <Stack.Screen
        name="ReviewPayment"
        component={ReviewPaymentScreen}
      />

      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;