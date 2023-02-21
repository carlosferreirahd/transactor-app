import React, { useCallback, useEffect, useMemo } from 'react';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { useQuery } from '../../hooks/useQuery';
import { SELECT_TRANSACTIONS_BY_CONSUMER_ID, UPDATE_CONSUMER } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';
import { useConsumers } from '../../hooks/useConsumers';
import { TransactionsDetailsView } from './TransactionsDetailsView';
import { useTransactions } from '../../hooks/useTransactions';

export function TransactionsDetails({
  route,
  navigation,
}) {

  const consumerId = route?.params?.consumerId;

  const allConsumers = useConsumers((state) => state.consumers);

  const allTransactions = useTransactions((state) => state.transactions);

  const addToBalanceById = useConsumers((state) => state.addToBalanceById);

  const { loading: isLoading } = useTransactions((state) => state.fetchTransactionsData);

  const showFeedbackMessage = useFeedbackMessage((state) => state.showFeedbackMessage);

  const currentConsumerInfo = useMemo(() => {
    return allConsumers.find(consumer => consumer.id === consumerId) || {};
  }, [allConsumers, consumerId]);

  const transactions = useMemo(() => {
    return allTransactions.filter(transaction => transaction.consumerId === consumerId);
  }, [allTransactions, consumerId]);

  function handleAfterTransactionOperation({ addedValue }) {
    addToBalanceById({
      consumerId,
      balanceToBeAdded: addedValue,
    });

    showFeedbackMessage({
      message: "Saldo do cliente atualizado com sucesso!",
    });
  }

  return (
    <TransactionsDetailsView
      consumerId={consumerId}
      currentConsumerInfo={currentConsumerInfo}
      transactions={transactions}
      isLoading={isLoading}
      handleAfterTransactionOperation={handleAfterTransactionOperation}
    />
  );
}
