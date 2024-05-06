import React, { useState } from 'react';
import { generateSecureRandom } from 'react-native-securerandom';
import { generateKeys } from '@/components/utils/AccountUtils';
import { useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import "@ethersproject/shims"
import { set } from 'date-fns';
import { ethers } from 'ethers';
import { goerli } from '@/app/models/Chain';
const provider = ethers.getDefaultProvider();
const Page = () => {
  const {signOut} = useAuth();
  const [showRecoverInput, setShowRecoverInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seedInput, setSeedInput] = useState('');
  const [keys, setKeys] = useState(null);
  const [showKeys, setShowKeys] = useState(false);
  const [balance, setBalance] = useState(null);
  const [showSeedInput, setShowSeedInput] = useState(false);
  const onLogoutPress = () => {
    signOut();
  };

  const onCreateWalletPress = () => {
    const keys = generateKeys();
    setKeys(keys);
    setShowKeys(true);
    console.log({keys});
  };
  const fetchBalance = async () => {
    console.log(keys._j.seedPhrase);
    const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
   // console.log({provider});
    const balance = await provider.getBalance(keys._j.address);
    setBalance(ethers.utils.formatEther(balance));
  };
  const onRecoverAccountPress = () => {
    if (!showRecoverInput) {
      setShowRecoverInput(true);
    } else {
      const keys = generateKeys(seedPhrase);
      setKeys(keys);
      console.log({keys});
      setShowRecoverInput(false);
    }
  };

  const onContinuePress = () => {
    setShowKeys(false);
  };

  
  if (showKeys) {
    console.log({keys});
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Save Your Keys</Text>
        <Text style={styles.text}>Keys: {keys._j.seedPhrase}</Text>
        <TouchableOpacity style={styles.button} onPress={onContinuePress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSeedPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeedPhrase(event.target.value);
  };

  const handleSeedPhraseSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const keys = generateKeys(seedPhrase);
    console.log({keys});
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your wallet address is:</Text>
      <View>
        <Text style={styles.text}>
          {keys && keys._j.address}
        </Text>
        <Button title="Fetch Balance" onPress={fetchBalance} />
        <Text style={styles.text}>ddddddddd {balance}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onCreateWalletPress}>
        <Text style={styles.buttonText}>Create Wallet Account</Text>
      </TouchableOpacity>


      {!showRecoverInput && (
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={onRecoverAccountPress}>
        <Text style={styles.buttonText}>Recover  Wallet Account</Text>
      </TouchableOpacity>

  )}
        {showRecoverInput && (

        <><TextInput
          style={styles.input}
          onChangeText={setSeedPhrase}
          value={seedPhrase}
          placeholder="Enter seed phrase or private key"
          onSubmitEditing={onRecoverAccountPress} /><TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={onRecoverAccountPress}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity></>

  )}
      {
        seedInput && (
          <View>
          <TextInput
            style={styles.input}
            onChangeText={setSeedInput}
            value={seedInput}
            placeholder="Enter seed phrase or private key"
            onSubmitEditing={onRecoverAccountPress}
          />
          <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleSeedPhraseSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
        )

      }
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
    color: '#fdfffc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#fdfffc',
    backgroundColor: '#2ec4b6',
  },
});

export default Page;