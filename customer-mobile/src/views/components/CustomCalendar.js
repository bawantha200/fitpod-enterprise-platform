
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
    setCurrentMonth(
      new Date(year, month + direction, 1)
    );
  };

  const handleDateSelect = (day) => {
    if (!day || isPastDate(day)) return;

    const newDate = new Date(year, month, day);
    onDateSelect(newDate);
  };

  return (
    <View style={styles.container}>

      {/* Month Header */}
      <View style={styles.monthHeader}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => changeMonth(-1)}
        >
          <ChevronLeft size={22} color={LIME} />
        </TouchableOpacity>

        <Text style={styles.monthTitle}>
          {monthNames[month]} {year}
        </Text>

        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => changeMonth(1)}
        >
          <ChevronRight size={22} color={LIME} />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekRow}>
        {days.map((day) => (
          <View key={day} style={styles.dayCell}>
            <Text style={styles.weekText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Dates */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => {
          if (!day) {
            return (
              <View key={`empty-${index}`} style={styles.dateCell} />
            );
          }

          const selected = isSameDate(selectedDate, day);
          const todaySelected = isSameDate(today, day);
          const disabled = isPastDate(day);

          return (
            <TouchableOpacity
              key={day}
              style={styles.dateCell}
              disabled={disabled}
              onPress={() => handleDateSelect(day)}
            >
              <View
                style={[
                  styles.dateCircle,
                  todaySelected && styles.todayCircle,
                  selected && styles.selectedCircle,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    disabled && styles.disabledText,
                    todaySelected && styles.todayText,
                    selected && styles.selectedText,
                  ]}
                >
                  {day}
                </Text>
              </View>

              {todaySelected && !selected && (
                <View style={styles.todayDot} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected Date */}
      <View style={styles.footer}>
        <View style={styles.legend}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Selected date</Text>
        </View>

        <Text style={styles.selectedDateText}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#303030',
    padding: 14,
    marginTop: 12,
  },

  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },

  monthTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  weekRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  dayCell: {
    width: '14.2857%',
    alignItems: 'center',
  },

  weekText: {
    color: '#777777',
    fontSize: 10,
    fontWeight: '700',
  },

  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  dateCell: {
    width: '14.2857%',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },

  selectedCircle: {
    backgroundColor: LIME,
  },

  selectedText: {
    color: '#000000',
    fontWeight: '800',
  },

  todayCircle: {
    borderWidth: 1,
    borderColor: LIME,
  },

  todayText: {
    color: LIME,
  },

  disabledText: {
    color: '#444444',
  },

  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: LIME,
    position: 'absolute',
    bottom: 0,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#303030',
    marginTop: 14,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: LIME,
  },

  legendText: {
    color: '#888888',
    fontSize: 11,
  },

  selectedDateText: {
    color: LIME,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default CustomCalendar;
