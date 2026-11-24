import React, { useState, useRef } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// .env eke EXPO_PUBLIC_API_URL eka use karanawa, nathnam fallback eka
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000');

console.log('API_BASE_URL:', API_BASE_URL);

const RegistrationScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [userType, setUserType] = useState('CUSTOMER'); 

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleRegister = async () => {
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

    setIsLoading(true);
    try {
      console.log('Registering via:', `${API_BASE_URL}/api/auth/register`);

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          password: password,
          userType: 'CUSTOMER',
          phone: phone.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        Alert.alert('Registration Failed', data.message || 'Something went wrong.');
        return;
      }

      // Success
      await AsyncStorage.setItem('authToken', data.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.data.user));

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('MainTabs') } 
      ]);

    } catch (error) {
      console.error(error);
      Alert.alert('Network Error', 'Could not connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

          {/* Branding */}
          <View className="items-center mt-8 mb-10">
            <View className="flex-row items-center">
              <Text className="text-white text-4xl font-extrabold tracking-tight">FitPod</Text>
              <View className="w-2.5 h-2.5 rounded-full bg-[#C6F135] ml-1 mt-5" />
            </View>
            <Text className="text-[#999999] text-[10px] tracking-[3px] mt-2">YOUR SPACE. YOUR PACE.</Text>
          </View>

          <View className="mb-7">
            <Text className="text-white text-3xl font-bold mb-2">Create Your Account</Text>
            <Text className="text-[#999999] text-sm">Join FitPod and start your fitness journey.</Text>
          </View>

          {/* Full Name */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Full Name</Text>
            <View className="h-14 flex-row items-center bg-[#191919] border border-[#333333] rounded-xl px-4">
              <TextInput
                className="flex-1 text-white text-sm h-full"
                placeholder="Enter your full name"
                placeholderTextColor="#777777"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
            </View>
          </View>

          {/* Phone */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Phone Number (Optional)</Text>
            <View className="h-14 flex-row items-center bg-[#191919] border border-[#333333] rounded-xl px-4">
              <TextInput
                ref={phoneRef}
                className="flex-1 text-white text-sm h-full"
                placeholder="Enter your phone number"
                placeholderTextColor="#777777"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => emailRef.current?.focus()}
              />
            </View>
          </View>

          {/* Email */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Email Address</Text>
            <View className="h-14 flex-row items-center bg-[#191919] border border-[#333333] rounded-xl px-4">
              <TextInput
                ref={emailRef}
                className="flex-1 text-white text-sm h-full"
                placeholder="Enter your email address"
                placeholderTextColor="#777777"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Password</Text>
            <View className="h-14 flex-row items-center bg-[#191919] border border-[#333333] rounded-xl px-4">
              <TextInput
                ref={passwordRef}
                className="flex-1 text-white text-sm h-full"
                placeholder="Create a password (min 8 chars)"
                placeholderTextColor="#777777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text className="text-[#C6F135] text-xs font-semibold">{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-5">
            <Text className="text-white text-sm font-semibold mb-2">Confirm Password</Text>
            <View className="h-14 flex-row items-center bg-[#191919] border border-[#333333] rounded-xl px-4">
              <TextInput
                ref={confirmPasswordRef}
                className="flex-1 text-white text-sm h-full"
                placeholder="Confirm your password"
                placeholderTextColor="#777777"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                returnKeyType="done" 
                onSubmitEditing={() => {}} 
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text className="text-[#C6F135] text-xs font-semibold">{showConfirmPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <TouchableOpacity
            className="flex-row items-start mb-7"
            activeOpacity={0.8}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            <View
              className={`w-5 h-5 rounded border items-center justify-center mr-3 mt-0.5 ${
                acceptedTerms ? 'bg-[#C6F135] border-[#C6F135]' : 'border-[#666666] bg-transparent'
              }`}
            >
              {acceptedTerms && <Text className="text-black text-xs font-bold">✓</Text>}
            </View>
            <Text className="text-[#999999] text-xs flex-1 leading-5">
              I agree to the <Text className="text-[#C6F135] font-semibold">Terms & Conditions</Text> and <Text className="text-[#C6F135] font-semibold">Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            className={`h-14 rounded-xl flex-row items-center justify-center mb-7 ${isLoading ? 'bg-[#9bbf2a]' : 'bg-[#C6F135]'}`}
            activeOpacity={0.8}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <>
                <Text className="text-black font-bold text-base">Create Account</Text>
                <Text className="text-black text-xl ml-2">→</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Login Nav */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-[#999999] text-sm">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-[#C6F135] text-sm font-bold">Log In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;