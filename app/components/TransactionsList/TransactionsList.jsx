import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { isNilOrEmpty } from '../../utils/verifications';
import { EmptyState } from '../EmptyState/EmptyState';
import { TransactionsListRow } from './TransactionsListRow';

export function TransactionsList({
  transactions,
  filterType,
}) {

  const filteredTransactions = useMemo(() => {
    if (filterType === 'all') return transactions;

    if (filterType === 'payments') return transactions.filter(t => t.value < 0.0);

    if (filterType === 'purchases') return transactions.filter(t => t.value > 0.0);

    return [];
  }, [transactions, filterType]);

  function renderList() {
    if (isNilOrEmpty(filteredTransactions)) {
      return (
        <EmptyState
          description="Nenhuma transação encontrada"
          icon="alert-circle-outline"
        />
      );
    }

    return (
      <ScrollView>
        {filteredTransactions.map(transaction => (
          <TransactionsListRow
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View
      style={styles.fullContainer}
    >
      <Surface
        style={[styles.surfaceContainer, isNilOrEmpty(filteredTransactions) ? styles.fullContainer : {}]}
        elevation={4}
      >
        {renderList()}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  surfaceContainer: {
    padding: 8,
    borderRadius: 8,
  },
});
