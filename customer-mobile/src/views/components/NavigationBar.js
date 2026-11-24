import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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

const ICONS = {
  Home,
  Bookings: CalendarDays,
  Cafe: Coffee,
  Wallet,
  Profile: User,
};

const NavigationBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row border-t px-1"
      style={{
        backgroundColor: BACKGROUND,
        borderTopColor: BORDER,
        paddingBottom: insets.bottom,
        borderTopWidth: 1,
      }}
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
            className="flex-1 h-[62px] items-center justify-center"
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

            <Text
              className="text-[10px] mt-[5px]"
              style={{
                color: focused ? GREEN : WHITE,
                fontWeight: focused ? '600' : '400',
              }}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationBar;