import React, { useCallback, useEffect, useMemo } from 'react';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { useQuery } from '../../hooks/useQuery';
import { SELECT_TRANSACTIONS_BY_CONSUMER_ID, UPDATE_CONSUMER } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';
import { useConsumers } from '../../hooks/useConsumers';
import { TransactionsDetailsView } from './TransactionsDetailsView';

export function TransactionsDetails({
  route,
  navigation,
}) {

  const consumerId = route?.params?.consumerId;

  const consumers = useConsumers((state) => state.consumers);

  const updateConsumerFromStore = useConsumers((state) => state.updateConsumer);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const showFeedbackMessage = useFeedbackMessage((state) => state.showFeedbackMessage);

  const {
    loading: selectLoading,
    error: selectError,
    data: selectData,
    executeQuery: selectQuery,
  } = useQuery();

  const {
    loading: updateConsumerLoading,
    error: updateConsumerError,
    data: updateConsumerData,
    executeQuery: updateConsumerQuery,
  } = useQuery();

  const transactions = selectData?.rows?._array;

  const isLoading = selectLoading || updateConsumerLoading;

  const currentConsumerInfo = useMemo(() => {
    return consumers.find(consumer => consumer.id === consumerId);
  }, [consumers, consumerId]);

  const getTransactionsByConsumerId = useCallback(() => {
    selectQuery({
      query: SELECT_TRANSACTIONS_BY_CONSUMER_ID,
      params: [consumerId],
    });
  }, [selectQuery]);

  const updateConsumerInfo = useCallback(({ currentName, newBalance }) => {
    updateConsumerQuery({
      query: UPDATE_CONSUMER,
      params: [currentName, newBalance, consumerId],
    });
  }, [updateConsumerQuery]);

  useEffect(() => {
    getTransactionsByConsumerId();
  }, [getTransactionsByConsumerId]);

  useEffect(() => {
    if (!isNilOrEmpty(selectError)) {
      showErrorModal({
        title: 'Erro ao buscar transações',
        description: 'Não foi possível carregar as transações deste usuário no momento',
        buttonText: 'Tentar novamente',
        onButtonClick: getTransactionsByConsumerId,
      });
    }

    if (!isNilOrEmpty(updateConsumerError)) {
      showErrorModal({
        title: 'Erro ao atualizar o saldo do cliente',
        description: 'Não foi possível atualizar os dados do cliente',
        buttonText: 'Tentar novamente',
        onButtonClick: () => updateConsumerInfo({
          currentName: currentConsumerInfo.name,
          newBalance: currentConsumerInfo.balace,
        }),
      });
    }
  }, [selectError, updateConsumerError]);

  useEffect(() => {
    if (!isNilOrEmpty(updateConsumerData)) {
      showFeedbackMessage({
        message: "Saldo do cliente atualizado com sucesso!",
      });
    }
  }, [updateConsumerData]);

  function handleAfterTransactionOperation({ addedValue }) {
    function safeSum(a, b) {
      return (a * 100 + b * 100) / 100;
    }

    if (isNilOrEmpty(currentConsumerInfo)) return;

    const calculatedValue = safeSum(currentConsumerInfo.balance, addedValue);
    const finalValue = isNaN(calculatedValue) ? 0.0 : calculatedValue;

    updateConsumerFromStore({
      consumerId,
      newConsumerName: currentConsumerInfo.name,
      newConsumerBalance: finalValue,
    });

    // update balance in consumer table
    updateConsumerInfo({
      currentName: currentConsumerInfo.name,
      newBalance: finalValue,
    });

    // refresh transactions list
    getTransactionsByConsumerId();
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
