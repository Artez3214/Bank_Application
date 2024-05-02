import Dropdown from '@/components/Dropdown';
import RoundBtn from '@/components/RoundBtn';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBalanceStore } from '@/store/balanceStore';

type RoundBtnProps = {
  text: string;
  icon: typeof  Ionicons.defaultProps;
  onPress?: () => void;
}

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000),
      date: new Date(),
      title: 'Added money',
    });
  };
  return (
 
    <View style={[{backgroundColor: '#030304', marginTop: 90}]}>

<View >
        <View style={styles.row}>
          <Text style={[styles.balance, { color: '#fdfffc' }]}>{balance()}</Text>
          <Text style={[styles.currency, { color: '#fdfffc' }]}>€</Text>
        </View>
        <View style={styles.actionRow}>
          <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
          <RoundBtn icon={'list'} text={'Details'} />
          <RoundBtn icon={'refresh'} text={'Exchange'} onPress={clearTransactions} />
        </View>
      </View><Text style={[defaultStyles.sectionHeader, { color: Colors.lightGray}]}>Transactions</Text>

<ScrollView style={styles.transactions}>
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
      </ScrollView>
      
      </View>
   
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 50,
    alignItems: 'center',
  },
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
    gap: 20,
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
});
export default Page;
