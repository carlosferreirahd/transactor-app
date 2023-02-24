import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { isNilOrEmpty } from '../../utils/verifications';
import { EmptyState } from '../EmptyState/EmptyState';
import { TransactionsListRow } from './TransactionsListRow';
import moment from 'moment';

export function TransactionsList({
  transactions,
  filterType,
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
          style={styles.emptyState}
        />
      );
    }

    return (
      <ScrollView
        style={styles.scrollerContainer}
        contentContainerStyle={styles.scrollerContentContainer}
      >
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

  return renderList();
}

const styles = StyleSheet.create({
  scrollerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  scrollerContentContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  emptyState: {
    paddingBottom: 100,
  },
});
