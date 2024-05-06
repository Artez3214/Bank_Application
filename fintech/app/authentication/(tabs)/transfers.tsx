/*import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { ethers } from 'ethers';
import { goerli } from '@/app/models/Chain';
import { sendToken } from '@/components/utils/TransactionUtils';

const TransactionPage = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const sendTransaction = async () => {
    const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
    const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState(0);

    function handleDestinationAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
      setDestinationAddress(event.target.value);
    }
  
    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
      setAmount(Number.parseFloat(event.target.value));
    }
    try {
      const { receipt } = await sendToken(amount, account.address, destinationAddress, account.privateKey);
      const txReceipt = await provider.waitForTransaction(txResponse.hash);
      console.log('Transaction receipt:', txReceipt);
    } catch (error) {
      console.error('Failed to send transaction:', error);
    }
  };

  return (
    <View>
      <Text>Send Ether</Text>
      <TextInput
        placeholder="Recipient address"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        placeholder="Amount in Ether"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Send" onPress={sendTransaction} />
    </View>
  );
};

export default TransactionPage;*/