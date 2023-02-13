import moment from 'moment';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { isNilOrEmpty } from '../../utils/verifications';
import { EmptyState } from '../EmptyState/EmptyState';
import { TransactionsListRow } from './TransactionsListRow';

export function TransactionsList({
  transactions,
  filterType,
  clearBackground = false,
  canDelete = false,
  showConsumerName = false,
  afterDeleteTransaction,
}) {

  const sortedByDateTransactions = useMemo(() => {
    return transactions.sort((a, b) => moment(b.operationTime).diff(a.operationTime));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    if (filterType === 'all') return sortedByDateTransactions;

    if (filterType === 'payments') return sortedByDateTransactions.filter(t => t.value < 0.0);

    if (filterType === 'purchases') return sortedByDateTransactions.filter(t => t.value > 0.0);

    return [];
  }, [sortedByDateTransactions, filterType]);

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
      <ScrollView style={clearBackground ? styles.clearContainer : {}}>
        {filteredTransactions.map(transaction => (
          <TransactionsListRow
            key={transaction.id}
            transaction={transaction}
            canDelete={canDelete}
            showConsumerName={showConsumerName}
            afterDeleteTransaction={afterDeleteTransaction}
          />
        ))}
      </ScrollView>
    );
  }

  function renderSurfaceList() {
    return (
      <Surface
        style={[styles.surfaceContainer, isNilOrEmpty(filteredTransactions) ? styles.fullContainer : {}]}
        elevation={4}
      >
        {renderList()}
      </Surface>
    );
  }

  return (
    <View style={styles.fullContainer}>
      {clearBackground ? renderList() : renderSurfaceList()}
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
  clearContainer: {
    padding: 16,
  }
});
