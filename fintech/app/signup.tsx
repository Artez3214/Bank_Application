import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
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
  const keyboardVerticalOffset = Platform.OS === 'android' ? -80 : 0;

  const onSignup = async () => {};

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior="padding"
    keyboardVerticalOffset={keyboardVerticalOffset}>
    <View style={[defaultStyles.container, { backgroundColor: Colors.background }]}>
      <Text style={[defaultStyles.header, { backgroundColor: '#011627', color: '#fdfffc', padding: 10 }]}>
        How about we begin?
      </Text>
      <Text style={defaultStyles.descriptionText}>
        Please provide your phone number. We'll send a confirmation code to verify it.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: '#fdfffc', color: Colors.gray, flex: 0.3 }]}
          placeholder="Country code"
          placeholderTextColor={Colors.gray}
          value={countryCode}
        />
        <TextInput
          style={[styles.input, { flex: 0.7, backgroundColor: '#fdfffc', color: Colors.gray }]}
          placeholder="Mobile number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>Have an existing account? Sign in.</Text>
        </TouchableOpacity>
      </Link>
      <View style={{flex:1}}/>
      <TouchableOpacity
      style={[
        defaultStyles.pillButton,
        phoneNumber !== '' ? styles.enabled :styles.disabled,
        {backgroundColor:  Colors.green, marginTop: 20}

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
