import React from 'react';
import { Text as RNText } from 'react-native';

const pick = (className = '') => {
  if (/\bfont-(extrabold|black)\b/.test(className)) return 'Inter_800ExtraBold';
  if (/\bfont-bold\b/.test(className)) return 'Inter_700Bold';
  if (/\bfont-semibold\b/.test(className)) return 'Inter_600SemiBold';
  if (/\bfont-medium\b/.test(className)) return 'Inter_500Medium';
  return 'Inter_400Regular';
};

const AppText = ({ className, style, ...props }) => (
  <RNText
    {...props}
    className={className}
    style={[{ fontFamily: pick(className) }, style]}
  />
);

export default AppText;