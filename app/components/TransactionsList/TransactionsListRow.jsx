import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, IconButton, List, Menu, Text } from 'react-native-paper';
import Currency from 'react-currency-formatter';
import { TransactionTypeTag } from './TransactionTypeTag';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import { useQuery } from '../../hooks/useQuery';
import { isNilOrEmpty } from '../../utils/verifications';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { DELETE_TRANSACTION_BY_ID } from '../../utils/queries';

export function TransactionsListRow({
  transaction,
  canDelete,
  afterDeleteTransaction,
}) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const {
    id,
    value,
    operationTime,
  } = transaction;

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

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

  return (
    <List.Item
      title={
        <View style={styles.titleContainer}>
          <Text
            variant="titleLarge"
            style={styles.titleText}
          >
            <Currency
              quantity={value}
              currency="BRL"
            />
          </Text>
          <TransactionTypeTag type={value < 0.0 ? "payment" : "purchase"} />
        </View>
      }
      description={() => <Text variant="titleMedium">{formattedOperationTime}</Text>}
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
