import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { SignedIn, isClerkAPIResponseError, useAuth, useSignIn, useUser } from '@clerk/clerk-expo';
import { clerk } from '@clerk/clerk-expo/dist/singleton';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View, Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';

enum SignInType {
  Phone,
  Email,
  Google
}

const Page = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId, sessionId, getToken} = useAuth();

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
        const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
        await completeSignIn.prepareFirstFactor({
            phoneNumberId: '',
            strategy: 'phone_code',
        })
      // Get the primary phone number if available
     // let number = user?.primaryPhoneNumber;
      
      // Proceed with further authentication steps...
      //router.push({ pathname: '/phoneNumberLogin'});
      //router.push({ pathname: '/phoneNumberLogin'});
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: Colors.background}]}>
      <TextInput
        autoCapitalize="none"
        placeholder="simon@galaxies.dev"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, {marginTop: 30}]}
      />

      <TouchableOpacity 
        onPress={onSignInPress}
        style={[
          defaultStyles.pillButton,
          { flexDirection: 'row', gap: 16, marginTop: 20, backgroundColor: Colors.green, alignSelf: 'center', width: '80%' }
        ]}>
        <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Continue</Text>
      </TouchableOpacity>

      <Link href="/reset" asChild>
        <Pressable style={styles.button}>
          <Text style={[{color: '#fdfffc'}]}>Forgot password?</Text>
        </Pressable>
      </Link>
      <Link href="/signup" asChild>
        <Pressable style={styles.button}>
          <Text style={[{color: '#fdfffc'}]}>Create Account</Text>
        </Pressable>
      </Link>
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
