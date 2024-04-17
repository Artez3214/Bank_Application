import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
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

enum SignInType {
  Phone,
  Email,
  Google
}

const Page = () => {
  const [countryCode, setCountryCode] = useState('+370');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'android' ? 70 : 0;

  const onSignin = async (type: SignInType) => {

    if(type === SignInType.Phone)  {

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
          onPress={() => onSignin(SignInType.Phone)}>
          <Text style={[defaultStyles.buttonText, { marginTop: 0 }]}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 20 }}>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.lightGray }}></View>
        </View>

        <TouchableOpacity 
        onPress={() => onSignin(SignInType.Email)}
        style={[
          defaultStyles.pillButton,
          { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
        ]}>
          <Ionicons name="mail" size={24} color={'#fff'} />
          <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Continue with email</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => onSignin(SignInType.Google)}
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
});

export default Page;
