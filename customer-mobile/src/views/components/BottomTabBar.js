import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Home,
  CalendarDays,
  Coffee,
  Wallet,
  User,
} from 'lucide-react-native';

const GREEN = '#B6FF00';
const BACKGROUND = '#000000';
const BORDER = '#303030';
const WHITE = '#FFFFFF';

// key = tab route name
const ICONS = {
  Home,
  Bookings: CalendarDays,
  Cafe: Coffee,
  Wallet,
  Profile: User,
};

const BottomTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const Icon = ICONS[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.item}
            onPress={onPress}
            activeOpacity={0.8}
          >
            {Icon && (
              <Icon
                size={21}
                color={focused ? GREEN : WHITE}
                strokeWidth={1.8}
              />
            )}

            <Text style={[styles.label, focused && styles.labelActive]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: 4,
  },

  item: {
    flex: 1,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  label: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '400',
  },

  labelActive: {
    color: GREEN,
    fontWeight: '600',
  },
});

export default BottomTabBar;