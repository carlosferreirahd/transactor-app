import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsTab() {

  const [filterType, setFilterType] = useState('all');

  const transactions = useTransactions((state) => state.transactions);

  const buttonsConfig = [
    {
      value: 'all',
      label: 'Todas',
      icon: filterType === 'all' ? 'check' : null,
    },
    {
      value: 'purchases',
      label: 'Compras',
      icon: filterType === 'purchases' ? 'check' : null,
    },
    {
      value: 'payments',
      label: 'Pagamentos',
      icon: filterType === 'payments' ? 'check' : null,
    }
  ];

  return (
    <View style={styles.viewContainer}>
      <SegmentedButtons
        value={filterType}
        onValueChange={setFilterType}
        buttons={buttonsConfig}
        style={styles.segmentedButtons}
      />
      <TransactionsList
        transactions={transactions}
        filterType={filterType}
        canDelete={false}
        showConsumerName
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
  },
  segmentedButtons: {
    paddingTop: 24,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  }
});
