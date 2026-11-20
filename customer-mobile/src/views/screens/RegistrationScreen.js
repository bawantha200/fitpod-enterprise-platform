
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const RegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Required Fields', 'Please fill in all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Weak Password', 'Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Terms Required', 'Please accept the Terms & Conditions.');
      return;
    }

    // Connect your registration API here.
    Alert.alert('Validation Successful', 'Your registration details are ready to submit.');
  };

  const InputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry = false,
    showToggle = false,
    toggleValue = false,
    onToggle,
    autoCapitalize = 'none',
  }) => (
    <View className="mb-5">
      <Text className="text-white text-sm font-semibold mb-2">
        {label}
      </Text>

      <View className="h-14 flex-row items-center bg-[#191919] border border-[#333333] rounded-xl px-4">
        <TextInput
          className="flex-1 text-white text-sm h-full"
          placeholder={placeholder}
          placeholderTextColor="#777777"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
        />

        {showToggle && (
          <TouchableOpacity onPress={onToggle}>
            <Text className="text-[#C6F135] text-xs font-semibold">
              {toggleValue ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 25 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* FitPod Branding */}
          <View className="items-center mt-8 mb-10">
            <View className="flex-row items-center">
              <Text className="text-white text-4xl font-extrabold tracking-tight">
                FitPod
              </Text>
              <View className="w-2.5 h-2.5 rounded-full bg-[#C6F135] ml-1 mt-5" />
            </View>

            <Text className="text-[#999999] text-[10px] tracking-[3px] mt-2">
              YOUR SPACE. YOUR PACE.
            </Text>
          </View>

          {/* Welcome Section */}
          <View className="mb-7">
            <Text className="text-white text-3xl font-bold mb-2">
              Create Your Account
            </Text>

            <Text className="text-[#999999] text-sm">
              Join FitPod and start your fitness journey.
            </Text>
          </View>

          {/* Registration Fields */}
          <View>

            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <InputField
              label="Phone Number (Optional)"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <InputField
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <InputField
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showToggle
              toggleValue={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />

            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              showToggle
              toggleValue={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity
            className="flex-row items-start mb-7"
            activeOpacity={0.8}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              className={`w-5 h-5 rounded border items-center justify-center mr-3 mt-0.5 ${
                acceptedTerms
                  ? 'bg-[#C6F135] border-[#C6F135]'
                  : 'border-[#666666] bg-transparent'
              }`}
            >
              {acceptedTerms && (
                <Text className="text-black text-xs font-bold">✓</Text>
              )}
            </View>

            <Text className="text-[#999999] text-xs flex-1 leading-5">
              I agree to the{' '}
              <Text className="text-[#C6F135] font-semibold">
                Terms & Conditions
              </Text>
              {' '}and{' '}
              <Text className="text-[#C6F135] font-semibold">
                Privacy Policy
              </Text>
              .
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <TouchableOpacity
            className="h-14 bg-[#C6F135] rounded-xl flex-row items-center justify-center mb-7"
            activeOpacity={0.8}
            onPress={handleRegister}
          >
            <Text className="text-black font-bold text-base">
              Create Account
            </Text>

            <Text className="text-black text-xl ml-2">→</Text>
          </TouchableOpacity>

          {/* Login Navigation */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-[#999999] text-sm">
              Already have an account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-[#C6F135] text-sm font-bold">
                Log In
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>

        {/* Home Indicator */}
        <View className="items-center justify-center h-5">
          <View className="w-32 h-1 bg-white rounded-full" />
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
