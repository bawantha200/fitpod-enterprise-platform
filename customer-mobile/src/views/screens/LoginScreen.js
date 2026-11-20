
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

  // Login validation and navigation
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

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    // Demo navigation only.
    // Connect backend authentication here before production use.
    navigation.replace('MainTabs');

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090909"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Brand */}
          <View style={styles.brandContainer}>
            <View style={styles.brandNameContainer}>
              <Text style={styles.brandName}>FitPod</Text>
              <View style={styles.limeDot} />
            </View>

            <Text style={styles.tagline}>
              YOUR SPACE. YOUR PACE.
            </Text>
          </View>

          {/* Welcome */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeHeading}>
              Welcome Back!
            </Text>

            <Text style={styles.welcomeSubtitle}>
              Log in to continue your fitness journey.
            </Text>
          </View>

          {/* Credentials */}
          <View style={styles.credentialsContainer}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Email address
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>✉</Text>

                <TextInput
                  style={styles.textInput}
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
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Password
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>🔒</Text>

                <TextInput
                  style={styles.textInput}
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
                  style={styles.passwordToggle}
                  activeOpacity={0.7}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Remember & Forgot */}
          <View style={styles.rememberForgotContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked,
                ]}
              >
                {rememberMe && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </View>

              <Text style={styles.rememberText}>
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
              <Text style={styles.linkText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Please wait...' : 'Login'}
            </Text>

            {!isLoading && (
              <Text style={styles.buttonArrow}>→</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />

            <Text style={styles.dividerText}>
              or continue with
            </Text>

            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert(
                  'Google',
                  'Google sign-in will be added soon.'
                )
              }
              activeOpacity={0.7}
            >
              <Text style={styles.googleIcon}>G</Text>

              <Text style={styles.socialButtonText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert(
                  'Facebook',
                  'Facebook sign-in will be added soon.'
                )
              }
              activeOpacity={0.7}
            >
              <Text style={styles.facebookIcon}>f</Text>

              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Sign Up',
                  'Registration screen will be added soon.'
                )
              }
              activeOpacity={0.7}
            >
              <Text style={styles.signupLink}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Home Indicator */}
          <View style={styles.homeIndicatorContainer}>
            <View style={styles.homeIndicator} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090909',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingBottom: 20,
  },

  // Brand
  brandContainer: {
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 45,
  },

  brandNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandName: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.5,
  },

  limeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C6FF4A',
    marginLeft: 5,
    marginTop: 22,
  },

  tagline: {
    color: '#A0A0A0',
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 8,
  },

  // Welcome
  welcomeContainer: {
    marginBottom: 30,
  },

  welcomeHeading: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  welcomeSubtitle: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 21,
  },

  // Inputs
  credentialsContainer: {
    gap: 20,
  },

  inputGroup: {
    gap: 10,
  },

  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 14,
    height: 58,
    paddingHorizontal: 16,
  },

  inputIcon: {
    color: '#AAAAAA',
    fontSize: 17,
    marginRight: 12,
  },

  textInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 10,
  },

  passwordToggle: {
    paddingLeft: 10,
  },

  showPasswordText: {
    color: '#C6FF4A',
    fontSize: 13,
    fontWeight: '600',
  },

  // Remember & Forgot
  rememberForgotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 28,
  },

  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555555',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  checkboxChecked: {
    backgroundColor: '#C6FF4A',
    borderColor: '#C6FF4A',
  },

  checkMark: {
    color: '#090909',
    fontSize: 13,
    fontWeight: 'bold',
  },

  rememberText: {
    color: '#B0B0B0',
    fontSize: 13,
  },

  linkText: {
    color: '#C6FF4A',
    fontSize: 13,
    fontWeight: '600',
  },

  // Login Button
  loginButton: {
    height: 58,
    borderRadius: 15,
    backgroundColor: '#C6FF4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonDisabled: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: '#090909',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonArrow: {
    color: '#090909',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    right: 22,
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#303030',
  },

  dividerText: {
    color: '#888888',
    fontSize: 12,
    marginHorizontal: 15,
  },

  // Social
  socialContainer: {
    gap: 14,
  },

  socialButton: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#303030',
    backgroundColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleIcon: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginRight: 13,
  },

  facebookIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 13,
  },

  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Sign Up
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  signupText: {
    color: '#999999',
    fontSize: 14,
    marginRight: 6,
  },

  signupLink: {
    color: '#C6FF4A',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Home Indicator
  homeIndicatorContainer: {
    alignItems: 'center',
    marginTop: 35,
  },

  homeIndicator: {
    width: 110,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});

export default LoginScreen;
