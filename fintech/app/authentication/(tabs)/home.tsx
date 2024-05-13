import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RoundBtn from '@/components/RoundBtn';
import Colors from '@/constants/Colors';
import { useBalanceStore } from '@/store/balanceStore';

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const [transferAmount, setTransferAmount] = useState(0);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [showTransferPage, setShowTransferPage] = useState(false);

  const onAddMoney = () => {
    const amount = Math.floor(Math.random() * 1000);
    console.log(showTransferPage)
    runTransaction({
      id: Math.random().toString(),
      amount,
      date: new Date(),
      title: `Added money: ${amount}€`,
    });
  };

  const handleTransfer = () => {
    if (balance() < transferAmount) {
      alert('You do not have enough balance for this transaction.');
      return;
    }
    if (!/^[A-Z]{2}\d+$/.test(address)) {
      alert('The address must start with two uppercase letters followed by numbers.');
      return;
    }
    // Handle transfer logic here, you may want to validate the transfer amount
    // and deduct it from the balance before adding it to transactions
    runTransaction({
      id: Math.random().toString(),
      amount: -transferAmount, // Assuming transfer is a negative value
      date: new Date(),
      title: `Money Transfer: ${transferAmount}€ to ${fullName} at ${address}`,
    });
    setTransferAmount(0);
    setFullName('');
    setAddress('');
    setShowTransferPage(false);
  };

  return (

    <View style={{ backgroundColor: '#030304', marginTop: 90 }}>
       {!showTransferPage && (
      <><View>
          <View style={styles.row}>
            <Text style={[styles.balance, { color: '#fdfffc' }]}>{balance()}</Text>
            <Text style={[styles.currency, { color: '#fdfffc' }]}>€</Text>
          </View>
          <View style={styles.actionRow}>
            <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
            <RoundBtn
              icon={'arrow-forward-outline'}
              text={'Transfer'}
              onPress={() => setShowTransferPage(true)} />
            <RoundBtn icon={'refresh'} text={'Exchange'} onPress={clearTransactions} />
          </View>
        </View><Text style={[styles.sectionHeader, { color: Colors.lightGray }]}>Transactions</Text><ScrollView style={styles.transactions}>
            {transactions.length === 0 && (
              <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>
            )}
            {transactions.map((transaction) => (
              <View
                key={transaction.id}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10 }}>
                <View style={styles.circle}>
                  <Ionicons
                    name={transaction.amount > 0 ? 'add' : 'remove'}
                    size={20}
                    color={Colors.dark} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
                  <Text style={{ color: Colors.gray, fontSize: 12 }}>
                    {transaction.date.toLocaleString()}
                  </Text>
                </View>
                <Text>{transaction.amount}€</Text>
              </View>
            ))}
          </ScrollView></>
       )}
      {showTransferPage && (
        <View style={styles.transferPage}>
          <Text style={{ color: '#fdfffc', marginBottom: 10 }}>Enter transfer details:</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Address"
          />
          <TextInput
            style={styles.input}
            value={transferAmount.toString()}
            onChangeText={(text) => setTransferAmount(parseFloat(text) || 0)}
            placeholder="Transfer Amount"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleTransfer}>
            <Text style={{ color: '#fff' }}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 30,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 400,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  transferPage: {
    backgroundColor: '#030304',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#ff9f1c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Page;
