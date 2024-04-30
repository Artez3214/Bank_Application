import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { isLoaded } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View, Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
  Pressable,
} from 'react-native';

const Page = () => {

  const keyboardVerticalOffset = Platform.OS === 'android' ? 70 : 0;
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      router.push({ pathname: '/verificationEmail/[email]', params: { email: emailAddress } });
      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }finally {
       setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

   //   await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };





  return (
    <View style={[styles.container, {backgroundColor: Colors.background}]}>
      <Text style={[defaultStyles.header, { backgroundColor: '#030304', color: '#fdfffc', padding: 10, marginTop: 50 }]}>
          How about we begin?
        </Text>
        <Text style={defaultStyles.descriptionText}>
          Please provide your phone number. We'll send a confirmation code to verify it.
        </Text>
    <TextInput
        autoCapitalize="none"
        placeholder="Your Email address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={[styles.input, { marginTop: 50 }]}
    />
    <TextInput
        placeholder="Your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, {marginTop: 30}]}
    />
 <Link href={'/login'} replace asChild>
          <TouchableOpacity>
            <Text style={[defaultStyles.textLink, {marginTop:20}]}>Have an existing account? Sign in.</Text>
          </TouchableOpacity>
        </Link>
<TouchableOpacity 
onPress={onSignUpPress}
style={[
  defaultStyles.pillButton,
  { flexDirection: 'row', gap: 16, marginTop: 40, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
]}>
  <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Continue</Text>
</TouchableOpacity>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    backgroundColor: '#fdfffc',
    color: Colors.gray,
    marginBottom: 16,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
