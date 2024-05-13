import React, { useState } from 'react';
import "react-native-get-random-values";

import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ethers, Wallet } from 'ethers';
import { goerli } from '@/app/models/Chain';
import { generateKeys } from '@/components/utils/AccountUtils';


import "@ethersproject/shims"


const TransactionPage = () => {

  const [showRecoverInput, setShowRecoverInput] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [seedInput, setSeedInput] = useState('');
  const [keys, setKeys] = useState(null);
  const [showKeys, setShowKeys] = useState(false);
  const [balance, setBalance] = useState(null);
  const [showSeedInput, setShowSeedInput] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  
  const sendTransaction = async () => {
    setShowTransfer(false);
    const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
    const wallet: Wallet = new ethers.Wallet(keys._j.privateKey, provider);
    const transaction = {
      to: recipient,
      value: ethers.utils.parseEther(amount)
    };
    try {
      const txResponse = await wallet.sendTransaction(transaction);
      const txReceipt = await provider.waitForTransaction(txResponse.hash);
      console.log('Transaction receipt:', txReceipt);
    } catch (error) {
      console.error('Failed to send transaction:', error);
    }
  };

  const handleTransfer = () => {
    setShowTransfer(true);
  };

  const onCreateWalletPress = async () => {
    const keys = generateKeys();
    setKeys(keys);
    setShowKeys(true);
   // fetchBalance();
    console.log({ keys });
  };

  const fetchBalance = async () => {
    if (!keys) return; 
    const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
    const balance = await provider.getBalance(keys._j.address);
    setBalance(ethers.utils.formatEther(balance));
  };

  const onRecoverAccountPress = () => {
    if (!showRecoverInput) {
      setShowRecoverInput(true);
    } else {
      const keys = generateKeys(seedPhrase);
      setKeys(keys);
      setShowRecoverInput(false);
    }
    fetchBalance();
  };

  const onContinuePress = () => {
    setShowKeys(false);
  };


  const handleSeedPhraseSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const keys = generateKeys(seedPhrase);
    console.log({ keys });
  }

  const handleTransferToFalse = () => {
    setShowTransfer(false);
  }

  return (
    <View style={styles.container}>
      {(!showTransfer && !showKeys) && (
        <>
          <View>
            <Text style={styles.title}>Your wallet address is:</Text>
            <Text style={styles.text}>
              {keys && keys._j.address}
            </Text>
            <Text style={styles.title}>ETH: {balance}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onCreateWalletPress}>
            <Text style={styles.buttonText}>Create Wallet Account</Text>
          </TouchableOpacity>
          {!showRecoverInput && (
            <TouchableOpacity style={styles.button} onPress={onRecoverAccountPress}>
              <Text style={styles.buttonText}>Recover Wallet Account</Text>
            </TouchableOpacity>
          )}
  
          <TouchableOpacity style={styles.button} onPress={fetchBalance}>
              <Text style={styles.buttonText}>Fetch Balance</Text>
            </TouchableOpacity>

          {showRecoverInput && (
            <>
              <TextInput
                style={styles.input}
                onChangeText={setSeedPhrase}
                value={seedPhrase}
                placeholder="Enter seed phrase or private key"
                onSubmitEditing={onRecoverAccountPress} />
              <TouchableOpacity style={styles.button} onPress={onRecoverAccountPress}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </>
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
                <TouchableOpacity style={styles.button} onPress={handleSeedPhraseSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )
          }
          <TouchableOpacity style={styles.button} onPress={handleTransfer}>
            <Text style={styles.buttonText}>Send Ether</Text>
          </TouchableOpacity>
        </>
      )}
        {(!showTransfer && showKeys) && (
           <><Text style={styles.title}>Save Your secret phrase:</Text>
           <Text style={styles.text}>
          {keys._j.seedPhrase}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onContinuePress}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity></>
        )}
      {showTransfer && (
        <View>
          <Text style={styles.title}>Send Ether</Text>
          <TextInput
            placeholder="Recipient address"
            value={recipient}
            onChangeText={setRecipient}
            style={styles.input}
          />
          <TextInput
            placeholder="Amount in Ether"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={sendTransaction}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTransferToFalse}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

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
    backgroundColor: '#2ec4b6',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fdfffc',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default TransactionPage;
