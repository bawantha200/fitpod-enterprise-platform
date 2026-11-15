import { useState, useMemo } from 'react';

const HOURLY_RATE = 2000;
const OPEN_HOUR = 4;
const SLOT_INTERVAL = 75;
const CLEANING_MINUTES = 15;

const useBookingViewModel = (initialBooking = {}) => {
  const [selectedDate, setSelectedDate] = useState(
    initialBooking.selectedDate
      ? new Date(initialBooking.selectedDate)
      : new Date()
  );

  const [selectedTime, setSelectedTime] = useState(
    initialBooking.selectedTime
      ? new Date(initialBooking.selectedTime)
      : new Date()
  );

  const [duration, setDuration] = useState(
    initialBooking.duration || 2
  );

  const [bookingType, setBookingType] = useState(
    initialBooking.bookingType || 'Individual'
  );

  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const totalPrice = duration * HOURLY_RATE;

  const formatDate = (date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  // Calculate booking and cleaning end times
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

  // Generate fixed booking slots
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

      const totalMinutes = duration * SLOT_INTERVAL;

      const availableUntil = new Date(candidate);
      availableUntil.setMinutes(
        availableUntil.getMinutes() + totalMinutes
      );

      const isFuture = !isToday || candidate > now;

      if (availableUntil <= midnight && isFuture) {
        slots.push(candidate);
      }

      slot.setMinutes(slot.getMinutes() + SLOT_INTERVAL);
    }

    return slots;
  }, [selectedDate, duration]);

  const selectedSlotIsValid = useMemo(
    () =>
      timeSlots.some(
        (time) =>
          time.getHours() === selectedTime.getHours() &&
          time.getMinutes() === selectedTime.getMinutes()
      ),
    [timeSlots, selectedTime]
  );

  // Calendar functions
  const changeMonth = (direction) => {
    setCurrentMonth((previous) => {
      const next = new Date(previous);
      next.setMonth(next.getMonth() + direction);
      return next;
    });
  };

  const selectDate = (date) => {
    setSelectedDate(date);

    const firstSlot = new Date(date);
    firstSlot.setHours(OPEN_HOUR, 0, 0, 0);

    setSelectedTime(firstSlot);
    setCurrentMonth(
      new Date(date.getFullYear(), date.getMonth(), 1)
    );
  };

  const selectTime = (time) => {
    setSelectedTime(new Date(time));
  };

  const selectDuration = (hours) => {
    setDuration(hours);

    const firstSlot = new Date(selectedDate);
    firstSlot.setHours(OPEN_HOUR, 0, 0, 0);

    setSelectedTime(firstSlot);
  };

  const selectBookingType = (type) => {
    setBookingType(type);
  };

  return {
    selectedDate,
    selectedTime,
    duration,
    bookingType,
    currentMonth,

    totalPrice,
    endTime,
    cleaningEndTime,
    timeSlots,
    selectedSlotIsValid,

    formatDate,
    formatTime,

    changeMonth,
    selectDate,
    selectTime,
    selectDuration,
    selectBookingType,
  };
};

export default useBookingViewModel;