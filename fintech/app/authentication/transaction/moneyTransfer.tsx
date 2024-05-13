import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const MoneyTransferPage = ({ navigation, route }: { navigation: any, route: any }) => {
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    // Update the transaction container
    route.params.setTransaction({ amount });

    // Navigate back to the main view
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter the amount"
        keyboardType="numeric"
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default MoneyTransferPage;