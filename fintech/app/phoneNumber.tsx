import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View, Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Page = () => {
  const [countryCode, setCountryCode] = useState('+370');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'android' ? 70 : 0;
  const router = useRouter();
  const {signUp}  = useSignUp();

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();

      router.push({ pathname: '/verification/[phone]', params: { phone: fullPhoneNumber } });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };




  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={[defaultStyles.container, { backgroundColor: Colors.background }]}>
        <Text style={[defaultStyles.header, { backgroundColor: '#030304', color: '#fdfffc', padding: 10, marginTop: 50 }]}>
          How about we begin?
        </Text>
        <Text style={defaultStyles.descriptionText}>
          Please provide your phone number. We'll send a confirmation code to verify it.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { backgroundColor: '#fdfffc', color: Colors.gray, flex: 0.2, marginRight: 10 }]}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 0.8, backgroundColor: '#fdfffc', color: Colors.gray }]}
            placeholder="Mobile number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { backgroundColor: Colors.green, marginTop: 0, width: '80%', alignSelf: 'center' } // Adjusted width and marginTop
          ]}
          onPress={onSignup}>
          <Text style={[defaultStyles.buttonText, { marginTop: 0 }]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
