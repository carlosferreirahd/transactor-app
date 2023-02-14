import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, IconButton, List, Menu, Text } from 'react-native-paper';
import { TransactionTypeTag } from './TransactionTypeTag';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import { useQuery } from '../../hooks/useQuery';
import { isNilOrEmpty } from '../../utils/verifications';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { DELETE_TRANSACTION_BY_ID } from '../../utils/queries';
import { useConsumers } from '../../hooks/useConsumers';
import { formatNumber } from 'react-native-currency-input';

export function TransactionsListRow({
  transaction,
  canDelete,
  showConsumerName,
  afterDeleteTransaction,
}) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const {
    id,
    value,
    operationTime,
    consumerId,
  } = transaction;

  const treatedBalance = value / 100;

  const formattedValue = formatNumber(treatedBalance, {
    separator: ',',
    prefix: 'R$ ',
    precision: 2,
    delimiter: '.',
    signPosition: 'beforePrefix',
  });

  const consumers = useConsumers((state) => state.consumers);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const consumerName = useMemo(() => {
    const findConsumer = (consumers || []).find(consumer => consumer.id === consumerId);
    if (!isNilOrEmpty(findConsumer)) return findConsumer.name;
    else return "";
  }, [consumers]);

  const {
    loading: deleteLoading,
    error: deleteError,
    data: deleteData,
    executeQuery: deleteQuery,
  } = useQuery();

  const deleteTransaction = useCallback(() => {
    deleteQuery({
      query: DELETE_TRANSACTION_BY_ID,
      params: [id],
    });
  }, [deleteQuery]);

  useEffect(() => {
    if (!isNilOrEmpty(deleteError)) {
      showErrorModal({
        title: 'Erro ao deletar transação',
        description: 'Não foi possível deletar esta transação, tente novamente mais tarde',
        buttonText: 'Entendi',
      });
    }
  }, [deleteError]);

  useEffect(() => {
    if (!isNilOrEmpty(deleteData) && afterDeleteTransaction) {
      const valueCorrection = value * -1;
      afterDeleteTransaction({ addedValue: valueCorrection });
    }
  }, [deleteData]);

  const formattedOperationTime = moment(operationTime).format('DD/MM/YYYY [às] HH:mm');

  const renderMenu = () => (
    <Menu
      visible={isMenuVisible}
      anchor={
        <IconButton
          icon="dots-horizontal"
          onPress={() => setIsMenuVisible(true)}
        />
      }
      onDismiss={() => setIsMenuVisible(false)}
    >
      <Menu.Item
        title="Excluir"
        onPress={deleteTransaction}
        leadingIcon="delete"
      />
    </Menu>
  );

  const renderLoading = () => (
    <ActivityIndicator animating={true} size="small" />
  );

  function renderRightContent() {
    return deleteLoading ? renderLoading() : canDelete ? renderMenu() : null;
  }

  const renderDescriptionContent = () => (
    <>
      <Text variant="titleMedium">{formattedOperationTime}</Text>
      {showConsumerName ? <Text variant="titleMedium">Cliente: {consumerName}</Text> : null}
    </>
  );

  return (
    <List.Item
      title={
        <View style={styles.titleContainer}>
          <Text
            variant="titleLarge"
            style={styles.titleText}
          >
            {formattedValue}
          </Text>
          <TransactionTypeTag type={value < 0.0 ? "payment" : "purchase"} />
        </View>
      }
      description={() => renderDescriptionContent()}
      left={() => <List.Icon color="#5bc100" icon="currency-brl" />}
      right={() => renderRightContent()}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
  titleText: {
    marginRight: 8,
  },
});
