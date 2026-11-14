import { useState, useEffect, useMemo } from 'react';
import apiClient from '../services/api/apiClient';

const HOURLY_RATE = 2000;
const CLEANING_MINUTES = 15;
const SLOT_INTERVAL = 75;
const OPEN_HOUR = 4;

const formatDate = (date) =>
  date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const formatTime = (date) =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

const useHomeViewModel = () => {
  // Backend connection
  const [connectionStatus, setConnectionStatus] = useState('Checking...');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await apiClient.get('/health');

        setConnectionStatus(
          response.data.success
            ? 'Connected to Backend'
            : 'Backend connection failed'
        );
      } catch (error) {
        console.log('API Error:', error.message);
        setConnectionStatus('Connection failed');
      }
    };

    checkBackend();
  }, []);

  // Booking states
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedTime, setSelectedTime] = useState(() => {
    const date = new Date();
    date.setHours(OPEN_HOUR, 0, 0, 0);
    return date;
  });

  const [duration, setDuration] = useState(2);
  const [bookingType, setBookingType] = useState('Individual');

  // Booking calculations
  const totalPrice = duration * HOURLY_RATE;

  const endTime = useMemo(() => {
    const end = new Date(selectedTime);

    end.setMinutes(
      end.getMinutes() +
        duration * 60 +
        (duration - 1) * CLEANING_MINUTES
    );

    return end;
  }, [selectedTime, duration]);

  const cleaningEndTime = useMemo(() => {
    const end = new Date(endTime);
    end.setMinutes(end.getMinutes() + CLEANING_MINUTES);
    return end;
  }, [endTime]);

  // Generate fixed time slots
  const timeSlots = useMemo(() => {
    const slots = [];

    const midnight = new Date(selectedDate);
    midnight.setHours(24, 0, 0, 0);

    const now = new Date();

    const isToday =
      selectedDate.toDateString() === now.toDateString();

    const slot = new Date(selectedDate);
    slot.setHours(OPEN_HOUR, 0, 0, 0);

    while (slot < midnight) {
      const candidate = new Date(slot);

      const cleaningEnd = new Date(candidate);
      cleaningEnd.setMinutes(
        cleaningEnd.getMinutes() + duration * SLOT_INTERVAL
      );

      const isFutureSlot = !isToday || candidate > now;

      if (cleaningEnd <= midnight && isFutureSlot) {
        slots.push(candidate);
      }

      slot.setMinutes(slot.getMinutes() + SLOT_INTERVAL);
    }

    return slots;
  }, [selectedDate, duration]);

  // Selected slot validation
  const selectedSlotIsValid = useMemo(() => {
    return timeSlots.some(
      (time) =>
        time.getHours() === selectedTime.getHours() &&
        time.getMinutes() === selectedTime.getMinutes()
    );
  }, [timeSlots, selectedTime]);

  // Booking event handlers
  const handleDateChange = (date) => {
    setSelectedDate(date);

    const firstSlot = new Date(date);
    firstSlot.setHours(OPEN_HOUR, 0, 0, 0);

    setSelectedTime(firstSlot);
  };

  const handleDurationChange = (hours) => {
    setDuration(hours);

    const firstSlot = new Date(selectedDate);
    firstSlot.setHours(OPEN_HOUR, 0, 0, 0);

    setSelectedTime(firstSlot);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(new Date(time));
  };

  return {
    // Existing Home data
    welcomeMessage: 'Welcome back, Nethmi',
    connectionStatus,

    pod: {
      name: 'FitPod Private Fitness Pod',
      capacity: 'Up to 4 people',
      equipment: 'Treadmill · Dumbbells · Bench · Mat',
      price: 'Rs. 2,000',
    },

    cafeItems: [
      {
        id: '1',
        name: 'Protein Smoothie',
        price: 'Rs. 650',
        emoji: '🥤',
      },
      {
        id: '2',
        name: 'Energy Bowl',
        price: 'Rs. 900',
        emoji: '🥗',
      },
    ],

    updates: [
      {
        id: '1',
        title: 'Your time, down to the minute.',
        description:
          'Enjoy your private workout session at your own pace.',
      },
      {
        id: '2',
        title: 'Fuel your next move.',
        description:
          'Discover fresh options from our nutrition cafe.',
      },
    ],

    // Booking states
    selectedDate,
    selectedTime,
    duration,
    bookingType,

    setBookingType,

    // Booking calculations
    totalPrice,
    endTime,
    cleaningEndTime,
    timeSlots,
    selectedSlotIsValid,

    // Booking handlers
    handleDateChange,
    handleDurationChange,
    handleTimeSelect,

    // Formatting helpers
    formatDate,
    formatTime,
  };
};

export default useHomeViewModel;
