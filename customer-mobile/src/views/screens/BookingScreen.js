
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

const BookingScreen = ({ navigation, route }) => {
  const booking = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={22} color="#B6FF00" />
        </TouchableOpacity>

        <Text style={styles.title}>Complete Your Booking</Text>
        <Text style={styles.subtitle}>
          Review your booking details before continuing.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Summary</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>
              {booking.selectedDate || 'Not selected'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Start Time</Text>
            <Text style={styles.value}>
              {booking.selectedTime || 'Not selected'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>
              {booking.duration ? `${booking.duration} Hour(s)` : 'Not selected'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Booking Type</Text>
            <Text style={styles.value}>
              {booking.bookingType || 'Individual'}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.total}>
              Rs. {booking.totalPrice || '0'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmText}>Continue to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#171717',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#303030',
    padding: 18,
  },
  cardTitle: {
    color: '#B6FF00',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#888888',
    fontSize: 14,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#303030',
    marginBottom: 20,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  total: {
    color: '#B6FF00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  confirmButton: {
    height: 54,
    backgroundColor: '#B6FF00',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  confirmText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
