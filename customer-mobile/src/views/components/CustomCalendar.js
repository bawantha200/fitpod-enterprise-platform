import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const LIME = '#B6FF00';

const CustomCalendar = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const today = new Date();

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const isSameDate = (date, day) =>
    date.getDate() === day &&
    date.getMonth() === month &&
    date.getFullYear() === year;

  const isPastDate = (day) => {
    const date = new Date(year, month, day);
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return date < todayDate;
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(year, month + direction, 1));
  };

  const handleDateSelect = (day) => {
    if (!day || isPastDate(day)) return;

    const newDate = new Date(year, month, day);
    onDateSelect(newDate);
  };

  return (
    <View className="bg-[#171717] rounded-2xl border border-[#303030] p-[14px] mt-3">

      {/* Month Header */}
      <View className="flex-row items-center justify-between mb-5">

        <TouchableOpacity
          className="w-9 h-9 rounded-[10px] bg-[#252525] items-center justify-center"
          onPress={() => changeMonth(-1)}
        >
          <ChevronLeft size={22} color={LIME} />
        </TouchableOpacity>

        <Text className="text-white text-base font-bold">
          {monthNames[month]} {year}
        </Text>

        <TouchableOpacity
          className="w-9 h-9 rounded-[10px] bg-[#252525] items-center justify-center"
          onPress={() => changeMonth(1)}
        >
          <ChevronRight size={22} color={LIME} />
        </TouchableOpacity>

      </View>

      {/* Week Days */}
      <View className="flex-row mb-[10px]">
        {days.map((day) => (
          <View
            key={day}
            className="w-[14.2857%] items-center"
          >
            <Text className="text-[#777777] text-[10px] font-bold">
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Dates */}
      <View className="flex-row flex-wrap">

        {calendarDays.map((day, index) => {
          if (!day) {
            return (
              <View
                key={`empty-${index}`}
                className="w-[14.2857%] h-[43px]"
              />
            );
          }

          const selected = isSameDate(selectedDate, day);
          const todaySelected = isSameDate(today, day);
          const disabled = isPastDate(day);

          return (
            <TouchableOpacity
              key={day}
              className="w-[14.2857%] h-[43px] items-center justify-center"
              disabled={disabled}
              onPress={() => handleDateSelect(day)}
            >
              <View
                className="w-9 h-9 rounded-full items-center justify-center"
                style={{
                  backgroundColor: selected ? LIME : 'transparent',
                  borderWidth: todaySelected && !selected ? 1 : 0,
                  borderColor: LIME,
                }}
              >
                <Text
                  className="text-[13px]"
                  style={{
                    color: disabled
                      ? '#444444'
                      : selected
                        ? '#000000'
                        : todaySelected
                          ? LIME
                          : '#FFFFFF',
                    fontWeight: selected ? '800' : '500',
                  }}
                >
                  {day}
                </Text>
              </View>

              {todaySelected && !selected && (
                <View className="absolute bottom-0 w-1 h-1 rounded-full bg-[#B6FF00]" />
              )}
            </TouchableOpacity>
          );
        })}

      </View>

      {/* Selected Date */}
      <View className="border-t border-[#303030] mt-[14px] pt-[14px] flex-row items-center justify-between">

        <View className="flex-row items-center gap-[7px]">
          <View className="w-2 h-2 rounded-full bg-[#B6FF00]" />

          <Text className="text-[#888888] text-[11px]">
            Selected date
          </Text>
        </View>

        <Text className="text-[#B6FF00] text-xs font-bold">
          {selectedDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>

      </View>

    </View>
  );
};

export default CustomCalendar;