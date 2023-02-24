import React, { useMemo, useState } from 'react';
import { ActivityIndicator, IconButton, List, Menu, Text } from 'react-native-paper';
import { TransactionTypeTag } from './TransactionTypeTag';
import { StyleSheet, View } from 'react-native';
import { isNilOrEmpty } from '../../utils/verifications';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useConsumers } from '../../hooks/useConsumers';
import { formatNumber } from 'react-native-currency-input';
import { useTransactions } from '../../hooks/useTransactions';
import moment from 'moment';
import { DeleteTransactionDialog } from '../DeleteTransactionDialog/DeleteTransactionDialog';

export function TransactionsListRow({
  transaction,
  canDelete,
  showConsumerName,
  afterDeleteTransaction,
}) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const formattedOperationTime = moment(operationTime).format('DD/MM/YYYY [às] HH:mm');

  const consumers = useConsumers((state) => state.consumers);

  const removeTransaction = useTransactions((state) => state.removeTransaction);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const consumerName = useMemo(() => {
    if (!showConsumerName) return "";

    const findConsumer = consumers.find(consumer => consumer.id === consumerId);
    if (!isNilOrEmpty(findConsumer)) return findConsumer.name;
    else return "";
  }, [consumers, showConsumerName]);

  function handleRemoveSuccess() {
    const valueCorrection = value * -1;
    afterDeleteTransaction({ addedValue: valueCorrection });
  }

  function handleRemoveError() {
    showErrorModal({
      title: 'Erro ao deletar transação',
      description: 'Não foi possível deletar esta transação, tente novamente mais tarde',
      buttonText: 'Entendi',
    });
  }

  function handleDeleteTransaction() {
    setDeleteLoading(true);
    setIsDeleteDialogVisible(false);
    removeTransaction({
      id: id,
      onSuccess: handleRemoveSuccess,
      onFail: handleRemoveError,
      onFinally: () => setDeleteLoading(false),
    });
  }

  function handleDeleteButtonPress() {
    setIsMenuVisible(false);
    setIsDeleteDialogVisible(true);
  }

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
        onPress={handleDeleteButtonPress}
        leadingIcon="delete"
      />
    </Menu>
  );

  const renderLoading = () => (
    <ActivityIndicator animating={true} size="small" />
  );

  const renderDelete = () => canDelete ? renderMenu() : null;

  function renderRightContent() {
    return deleteLoading ? renderLoading() : renderDelete();
  }

  const renderLeftContent = () => (
    <List.Icon color="#5bc100" icon="currency-brl" />
  );

  const renderDescriptionContent = () => (
    <>
      <Text variant="titleMedium">{formattedOperationTime}</Text>
      {showConsumerName ? <Text variant="titleMedium">Cliente: {consumerName}</Text> : null}
    </>
  );

  return (
    <>
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
        left={() => renderLeftContent()}
        right={() => renderRightContent()}
      />
      <DeleteTransactionDialog
        visible={isDeleteDialogVisible}
        loading={deleteLoading}
        onOk={handleDeleteTransaction}
        onDismiss={() => setIsDeleteDialogVisible(false)}
      />
    </>
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
