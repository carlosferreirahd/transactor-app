import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, HelperText, IconButton, Menu, Text, Tooltip } from 'react-native-paper';
import Currency from 'react-currency-formatter';
import { AddTransactionModal } from '../../components/AddTransactionModal/AddTransactionModal';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { useQuery } from '../../hooks/useQuery';
import { SELECT_TRANSACTIONS_BY_CONSUMER_ID, UPDATE_CONSUMER } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';
import { useConsumers } from '../../hooks/useConsumers';

export function TransactionsDetails({
  route,
  navigation,
}) {

  const consumerId = route?.params?.consumerId;

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, payments or purchases
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);

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

  function handleFilterChange(filterChoice) {
    setSelectedFilter(filterChoice);
    setIsMenuVisible(false);
  }

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

  function renderTransactions() {
    if (isNilOrEmpty(transactions)) {
      return (
        <EmptyState
          icon="currency-usd-off"
          description={`Adicione transações com o botão "+" acima`}
        />
      );
    }

    return (
      <TransactionsList
        transactions={transactions}
        filterType={selectedFilter}
        canDelete
        afterDeleteTransaction={handleAfterTransactionOperation}
      />
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.viewContainer, styles.viewLoadingContainer]}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.headerContainer}>
        <Text variant="headlineLarge">
          Transações
        </Text>
        <View style={styles.headerActionContainer}>
          <Tooltip title="Adicionar nova transação">
            <IconButton
              icon="plus"
              onPress={() => setAddModalIsVisible(true)}
            />
          </Tooltip>
          <Menu
            visible={isMenuVisible}
            anchor={
              <Tooltip title="Filtrar tipo de transação">
                <IconButton
                  icon="filter-variant"
                  onPress={() => setIsMenuVisible(true)}
                />
              </Tooltip>
            }
            onDismiss={() => setIsMenuVisible(false)}
          >
            <Menu.Item
              title="Todas"
              onPress={() => handleFilterChange('all')}
              trailingIcon={selectedFilter === 'all' ? "check" : null}
              titleStyle={selectedFilter === 'all' ? styles.selectedFilter : null}
            />
            <Menu.Item
              title="Pagamentos"
              onPress={() => handleFilterChange('payments')}
              trailingIcon={selectedFilter === 'payments' ? "check" : null}
              titleStyle={selectedFilter === 'payments' ? styles.selectedFilter : null}
            />
            <Menu.Item
              title="Compras"
              onPress={() => handleFilterChange('purchases')}
              trailingIcon={selectedFilter === 'purchases' ? "check" : null}
              titleStyle={selectedFilter === 'purchases' ? styles.selectedFilter : null}
            />
          </Menu>
        </View>
      </View>
      <HelperText visible style={styles.consumerNameText}>
        * Cliente: {currentConsumerInfo.name || ""}
      </HelperText>
      <HelperText visible style={styles.consumerNameText}>
        * Valor que o cliente deve: {' '}
        <Currency
          quantity={currentConsumerInfo.balance || 0}
          currency="BRL"
        />
      </HelperText>
      {renderTransactions()}
      <AddTransactionModal
        isVisible={addModalIsVisible}
        consumerId={consumerId}
        hideModal={() => setAddModalIsVisible(false)}
        afterAddTransaction={handleAfterTransactionOperation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  viewLoadingContainer: {
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerActionContainer: {
    flexDirection: 'row',
  },
  consumerNameText: {
    fontSize: 14,
  },
  selectedFilter: {
    color: '#005bc1',
  },
});
