import { useState, useMemo } from 'react';

const HOURLY_RATE = 2000;
const OPEN_HOUR = 4;
const CLOSING_HOUR = 24;
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
      : null
  );

  const [duration, setDuration] = useState(
    initialBooking.duration || 2
  );

  const [bookingType, setBookingType] = useState(
    initialBooking.bookingType || 'Individual'
  );

  const [currentMonth, setCurrentMonth] = useState(
    new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    )
  );

  // Calculate total booking price
  const totalPrice = duration * HOURLY_RATE;

  // Format date
  const formatDate = (date) => {
    if (!date) return '';

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
 
  // Format time
  const formatTime = (date) => {
    if (!date) return '--:--';

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Calculate booking end time
  const endTime = useMemo(() => {
    if (!selectedTime) return null;

    const end = new Date(selectedTime);

    end.setMinutes(
      end.getMinutes() + duration * 60
    );

    return end;
  }, [selectedTime, duration]);

  // Calculate cleaning end time
  const cleaningEndTime = useMemo(() => {
    if (!endTime) return null;

    const end = new Date(endTime);

    end.setMinutes(
      end.getMinutes() + CLEANING_MINUTES
    );

    return end;
  }, [endTime]);

  // Generate booking slots
  const timeSlots = useMemo(() => {
    const slots = [];

    const now = new Date();

    const isToday =
      selectedDate.toDateString() === now.toDateString();

    const occupiedMinutes =
      duration * 60 + CLEANING_MINUTES;

    const closingTime = new Date(selectedDate);
    closingTime.setHours(CLOSING_HOUR, 0, 0, 0);

    const slot = new Date(selectedDate);
    slot.setHours(OPEN_HOUR, 0, 0, 0);

    while (true) {
      const candidate = new Date(slot);

      const bookingEnd = new Date(candidate);
      bookingEnd.setMinutes(
        bookingEnd.getMinutes() + duration * 60
      );

      const cleaningEnd = new Date(bookingEnd);
      cleaningEnd.setMinutes(
        cleaningEnd.getMinutes() + CLEANING_MINUTES
      );

      const isFuture =
        !isToday || candidate > now;

      const fitsBeforeClosing =
        cleaningEnd <= closingTime;

      if (isFuture && fitsBeforeClosing) {
        slots.push(candidate);
      }

      slot.setMinutes(
        slot.getMinutes() + occupiedMinutes
      );

      if (slot >= closingTime) {
        break;
      }
    }

    return slots;
  }, [selectedDate, duration]);

  // Validate selected booking slot
  const selectedSlotIsValid = useMemo(() => {
    if (!selectedTime) return false;

    return timeSlots.some(
      (time) =>
        time.getHours() === selectedTime.getHours() &&
        time.getMinutes() === selectedTime.getMinutes()
    );
  }, [timeSlots, selectedTime]);

  // Change calendar month
  const changeMonth = (direction) => {
    setCurrentMonth((previous) => {
      const next = new Date(previous);

      next.setMonth(
        next.getMonth() + direction
      );

      return next;
    });
  };

  // Select booking date
  const selectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);

    setCurrentMonth(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      )
    );
  };

  // Select booking time
  const selectTime = (time) => {
    setSelectedTime(new Date(time));
  };

  // Select booking duration
  const selectDuration = (hours) => {
    setDuration(hours);
    setSelectedTime(null);
  };

  // Select booking type
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
