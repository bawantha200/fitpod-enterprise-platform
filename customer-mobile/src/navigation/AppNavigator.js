import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../views/screens/HomeScreen';
import BookingScreen from '../views/screens/BookingScreen';
import PodDetailsScreen from '../views/screens/PodDetailsScreen';
import PaymentScreen from '../views/screens/PaymentScreen';
import GroupInvitationScreen from '../views/screens/GroupInvitationScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="PodDetails" component={PodDetailsScreen} />
    <Stack.Screen name="Bookings" component={BookingScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="GroupInvitation" component={GroupInvitationScreen} />
  </Stack.Navigator>
  );
};

export default AppNavigator;