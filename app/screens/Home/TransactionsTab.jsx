import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FilterFab } from '../../components/FilterFab/FilterFab';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsTab() {

  const [isFilterFabOpen, setIsFilterFabOpen] = useState({ open: false });

  const onStateChange = ({ open }) => setIsFilterFabOpen({ open });

  const [filterType, setFilterType] = useState('all');

  const transactions = useTransactions((state) => state.transactions);

  const filterActions = [
    {
      icon: filterType === 'all' ? 'check' : 'currency-brl',
      label: 'Todas',
      size: 'medium',
      onPress: () => setFilterType('all'),
    },
    {
      icon: filterType === 'payments' ? 'check' : 'currency-brl',
      label: 'Pagamentos',
      size: 'medium',
      onPress: () => setFilterType('payments'),
    },
    {
      icon: filterType === 'purchases' ? 'check' : 'currency-brl',
      label: 'Compras',
      size: 'medium',
      onPress: () => setFilterType('purchases'),
    },
  ];

  return (
    <View style={styles.viewContainer}>
      <TransactionsList
        transactions={transactions}
        filterType={filterType}
        canDelete={false}
        clearBackground
        showConsumerName
      />
      <FilterFab
        isOpen={isFilterFabOpen.open}
        actions={filterActions}
        onStateChange={onStateChange}
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
  }
});
