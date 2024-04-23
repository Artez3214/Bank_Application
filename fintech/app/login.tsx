import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View, Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

enum SignInType {
  Phone,
  Email,
  Google
}

const Page = () => {
  const [countryCode, setCountryCode] = useState('+370');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'android' ? 70 : 0;
  const { signIn } = useSignIn();
  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
          return factor.strategy === 'phone_code';
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        });

        router.push({
          pathname: '/verification/[phone]',
          params: { phone: fullPhoneNumber, signin: 'true' },
        });
      } catch (err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}

      >
      <View style={[defaultStyles.container, { backgroundColor: Colors.background }]}>
        <Text style={[defaultStyles.header, { backgroundColor: '#030304', color: '#fdfffc', padding: 10, marginTop: 50 }]}>
          Welcome back!
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
    
        <TouchableOpacity style={[
          defaultStyles.pillButton,
          phoneNumber !== '' ? styles.enabled : styles.disabled,
          { marginBottom: 20, alignSelf: 'center', width: '80%' }
        ]}
          onPress={() => onSignIn(SignInType.Phone)}>
          <Text style={[defaultStyles.buttonText, { marginTop: 0 }]}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 20 }}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
        </View>

        <TouchableOpacity 
        onPress={() => onSignIn(SignInType.Email)}
        style={[
          defaultStyles.pillButton,
          { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
        ]}>
          <Ionicons name="mail" size={24} color={'#fff'} />
          <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Continue with email</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => onSignIn(SignInType.Google)}
        style={[
          defaultStyles.pillButton,
          { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: '#e71d36', alignSelf: 'center', width: '80%' }
        ]}>
          <Ionicons name="logo-google" size={24} color={'#fff'} />
          <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Continue with google</Text>
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
  codeFieldRoot: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 12,
  },
  cellRoot: {
    width: 45,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    paddingBottom: 8,
  },
  separator: {
    height: 2,
    width: 10,
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
});

export default Page;
