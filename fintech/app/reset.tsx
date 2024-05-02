import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';


const Page = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
  
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

 
  

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
        <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

        {!successfulCreation && (
        <>
               <TextInput
        autoCapitalize="none"
        placeholder="Your email address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={[styles.input, { marginTop: 50 }]}
      />
          <TouchableOpacity
        onPress={onRequestReset}
        
        style={[
          defaultStyles.pillButton,
          { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
        ]}>
        <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Send Reset Email</Text>
      </TouchableOpacity>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
          <TextInput
        autoCapitalize="none"
        placeholder="Your code"
        value={code}
        onChangeText={setCode}
        style={[styles.input, { marginTop: 50 }]}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { marginTop: 30 }]}
      />
          </View>

          <TouchableOpacity
        onPress={onReset}
        
        style={[
          defaultStyles.pillButton,
          { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
        ]}>
        <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Set new Password</Text>
      </TouchableOpacity>
        </>
      )}


    </View>
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
function setSuccessfulCreation(arg0: boolean) {
  throw new Error('Function not implemented.');
}

