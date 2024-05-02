import { generateSecureRandom } from 'react-native-securerandom';
//import { generateKeys } from '@/components/utils/AccountUtils.';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import "@ethersproject/shims"

const Page = () => {
  const {signOut} = useAuth();

  const onLogoutPress = () => {
    signOut();
  };

  const onCreateWalletPress = () => {
    //const keys = generateKeys();
    //console.log({keys});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Page</Text>
      <Text style={styles.text}>Welcome to your user page!</Text>
      <TouchableOpacity style={styles.button} onPress={onCreateWalletPress}>
        <Text style={styles.buttonText}>Create Wallet Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={onLogoutPress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030304',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdfffc',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#2ec4b6',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e71d36',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ff9f1c',
  },
});

export default Page;