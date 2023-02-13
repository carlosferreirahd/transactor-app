import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { FilterFab } from '../../components/FilterFab/FilterFab';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useQuery } from '../../hooks/useQuery';
import { SELECT_ALL_TRANSACTIONS } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';

export function TransactionsTab() {

  const [isFilterFabOpen, setIsFilterFabOpen] = useState({ open: false });

  const onStateChange = ({ open }) => setIsFilterFabOpen({ open });

  const [filterType, setFilterType] = useState('all');

  const { loading, error, data, executeQuery } = useQuery();

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const transactions = isNilOrEmpty(data?.rows?._array) ? [] : data?.rows?._array;

  const getAllTransactions = useCallback(() => {
    executeQuery({
      query: SELECT_ALL_TRANSACTIONS,
      params: [],
    });
  }, [executeQuery]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  useEffect(() => {
    if (!isNilOrEmpty(error)) {
      showErrorModal({
        title: 'Erro ao buscar transações',
        description: 'Não foi possível selecionar as transações do banco de dados',
        buttonText: 'Tentar novamente',
        onButtonClick: getAllTransactions,
      });
    }
  }, [error]);

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

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

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
    justifyContent: 'center',
  },
});
