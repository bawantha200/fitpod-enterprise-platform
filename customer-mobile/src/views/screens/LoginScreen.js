
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert(
        'Missing Details',
        'Please enter your email and password.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    // Demo navigation only.
    // Connect backend authentication here before production use.
    navigation.replace('MainTabs');

    setIsLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#090909]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090909"
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 26,
            paddingBottom: 20,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View className="items-center mt-[55px] mb-[45px]">
            <View className="flex-row items-center">
              <Text className="text-white text-[42px] font-extrabold tracking-[-1.5px]">
                FitPod
              </Text>

              <View className="w-[10px] h-[10px] rounded-full bg-[#C6FF4A] ml-[5px] mt-[22px]" />
            </View>

            <Text className="text-[#A0A0A0] text-[11px] tracking-[3px] mt-2">
              YOUR SPACE. YOUR PACE.
            </Text>
          </View>

          {/* Welcome */}
          <View className="mb-[30px]">
            <Text className="text-white text-[29px] font-bold mb-2">
              Welcome Back!
            </Text>

            <Text className="text-[#999999] text-sm leading-[21px]">
              Log in to continue your fitness journey.
            </Text>
          </View>

          {/* Credentials */}
          <View className="gap-5">

            {/* Email */}
            <View className="gap-[10px]">
              <Text className="text-white text-sm font-semibold">
                Email address
              </Text>

              <View className="flex-row items-center bg-[#171717] border border-[#303030] rounded-[14px] h-[58px] px-4">
                <Text className="text-[#AAAAAA] text-[17px] mr-3">
                  ✉
                </Text>

                <TextInput
                  className="flex-1 text-white text-sm py-[10px]"
                  placeholder="you@example.com"
                  placeholderTextColor="#777777"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Password */}
            <View className="gap-[10px]">
              <Text className="text-white text-sm font-semibold">
                Password
              </Text>

              <View className="flex-row items-center bg-[#171717] border border-[#303030] rounded-[14px] h-[58px] px-4">
                <Text className="text-[#AAAAAA] text-[17px] mr-3">
                  🔒
                </Text>

                <TextInput
                  className="flex-1 text-white text-sm py-[10px]"
                  placeholder="Enter your password"
                  placeholderTextColor="#777777"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="pl-[10px]"
                  activeOpacity={0.7}
                >
                  <Text className="text-[#C6FF4A] text-[13px] font-semibold">
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Remember & Forgot */}
          <View className="flex-row items-center justify-between mt-[22px] mb-7">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                className={`w-[19px] h-[19px] rounded-[5px] border justify-center items-center mr-[9px] ${
                  rememberMe
                    ? 'bg-[#C6FF4A] border-[#C6FF4A]'
                    : 'border-[#555555]'
                }`}
              >
                {rememberMe && (
                  <Text className="text-[#090909] text-[13px] font-bold">
                    ✓
                  </Text>
                )}
              </View>

              <Text className="text-[#B0B0B0] text-[13px]">
                Remember Me
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Forgot Password',
                  'Password recovery will be available soon.'
                )
              }
              activeOpacity={0.7}
            >
              <Text className="text-[#C6FF4A] text-[13px] font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className={`h-[58px] rounded-[15px] bg-[#C6FF4A] flex-row items-center justify-center ${
              isLoading ? 'opacity-60' : ''
            }`}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text className="text-[#090909] text-base font-bold">
              {isLoading ? 'Please wait...' : 'Login'}
            </Text>

            {!isLoading && (
              <Text className="text-[#090909] text-xl font-bold absolute right-[22px]">
                →
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-7">
            <View className="flex-1 h-px bg-[#303030]" />

            <Text className="text-[#888888] text-xs mx-[15px]">
              or continue with
            </Text>

            <View className="flex-1 h-px bg-[#303030]" />
          </View>

          {/* Social Buttons */}
          <View className="gap-[14px]">
            <TouchableOpacity
              className="h-14 rounded-[14px] border border-[#303030] bg-[#171717] flex-row items-center justify-center"
              onPress={() =>
                Alert.alert(
                  'Google',
                  'Google sign-in will be added soon.'
                )
              }
              activeOpacity={0.7}
            >
              <Text className="text-white text-[19px] font-bold mr-[13px]">
                G
              </Text>

              <Text className="text-white text-sm font-semibold">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-14 rounded-[14px] border border-[#303030] bg-[#171717] flex-row items-center justify-center"
              onPress={() =>
                Alert.alert(
                  'Facebook',
                  'Facebook sign-in will be added soon.'
                )
              }
              activeOpacity={0.7}
            >
              <Text className="text-white text-[22px] font-bold mr-[13px]">
                f
              </Text>

              <Text className="text-white text-sm font-semibold">
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up */}
          <View className="flex-row items-center justify-center mt-[30px]">
            <Text className="text-[#999999] text-sm mr-[6px]">
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}
              activeOpacity={0.7}
            >
              <Text className="text-[#C6FF4A] text-sm font-bold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Home Indicator */}
          <View className="items-center mt-[35px]">
            <View className="w-[110px] h-[5px] rounded-full bg-white" />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
