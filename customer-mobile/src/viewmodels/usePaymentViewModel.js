import { useMemo, useState } from 'react';

const DEMO_WALLET_BALANCE = 10500;

// Convert a time such as "06:15 PM" into "08:15 PM".
const calculateEndTime = (startTime, duration) => {
  const match = startTime?.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!match) return '--:--';

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const totalMinutes = hours * 60 + minutes + duration * 60;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;

  const endPeriod = endHours >= 12 ? 'PM' : 'AM';
  const displayHours = endHours % 12 || 12;

  return `${String(displayHours).padStart(2, '0')}:${String(
    endMinutes
  ).padStart(2, '0')} ${endPeriod}`;
};

const formatBookingDate = (dateValue) => {
  if (!dateValue) return 'Date not selected';

  let date;

  // BookingScreen currently sends DD/MM/YYYY.
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
    const [day, month, year] = dateValue.split('/');
    date = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    date = new Date(dateValue);
  }

  if (Number.isNaN(date.getTime())) return dateValue;

  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const usePaymentViewModel = (booking = {}) => {
  const [paymentMethod, setPaymentMethod] = useState('WALLET');

  // Temporary sample balance from the Figma design.
  // Replace this with the actual wallet balance from the backend.
  const walletBalance = DEMO_WALLET_BALANCE;

  const duration = Number(booking.duration || 2);
  const hourlyRate = Number(booking.selectedPod?.hourlyRate || 2000);
  const totalPrice = Number(booking.totalPrice || duration * hourlyRate);

  const endTime = useMemo(
    () => calculateEndTime(booking.selectedTime, duration),
    [booking.selectedTime, duration]
  );

  const formattedDate = useMemo(
    () => formatBookingDate(booking.selectedDate),
    [booking.selectedDate]
  );

  const remainingBalance = walletBalance - totalPrice;

  const hasSufficientBalance = walletBalance >= totalPrice;

  const canConfirmPayment =
    paymentMethod === 'PAYHERE' || hasSufficientBalance;

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  return {
    booking,
    paymentMethod,
    walletBalance,
    remainingBalance,
    totalPrice,
    duration,
    hourlyRate,
    endTime,
    formattedDate,
    hasSufficientBalance,
    canConfirmPayment,
    selectPaymentMethod,
  };
};

export default usePaymentViewModel;
