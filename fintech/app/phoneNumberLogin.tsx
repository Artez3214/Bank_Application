import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSignIn } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { isLoaded } from 'expo-font';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View, Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

enum SignInType {
  Phone,
  Email,
  Google
}

const Page = () => {
  const [countryCode, setCountryCode] = useState('+370');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
  const router = useRouter();
  const { signIn } = useSignIn();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      console.log('fullPhoneNumber1', fullPhoneNumber);
      const { supportedFirstFactors } = await signIn!.create({
        identifier: fullPhoneNumber
      });

      signIn?.validatePassword(password);

      const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
        return factor.strategy === 'phone_code';
      });
      const { phoneNumberId } = firstPhoneFactor;
      await signIn!.prepareFirstFactor({
        strategy: 'phone_code',
        phoneNumberId,
      });
      router.push({
        pathname: '/verificationPhone/[phone]',
        params: { phone: fullPhoneNumber, signin: 'true' },
      });

    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={[styles.container, { backgroundColor: Colors.background }]}>
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
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { marginTop: 30 }]}
        />

        <TouchableOpacity
          onPress={onSignInPress}
          style={[
            defaultStyles.pillButton,
            { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
          ]}>
          <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 20 }}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
        </View>
        <TouchableOpacity
          onPress={onSignInPress}
          style={[
            defaultStyles.pillButton,
            { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
          ]}>
          <Link href="/login">
            <Ionicons name="mail" size={20} color={'#fff'} />
            <Text style={[defaultStyles.buttonText, { color: '#fff', marginBottom: 60 }]}>  Continue with email</Text>
          </Link>
        </TouchableOpacity>

        <Link href="/reset" asChild>
          <Pressable style={styles.button}>
            <Text style={[{ color: '#fdfffc' }]}>Forgot password?</Text>
          </Pressable>
        </Link>
        <Link href="/signup" asChild>
          <Pressable style={styles.button}>
            <Text style={[{ color: '#fdfffc' }]}>Create Account</Text>
          </Pressable>
        </Link>
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
    backgroundColor: '#fdfffc',
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
  button: {
    margin: 15,
    marginTop: 20,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
});

export default Page;
