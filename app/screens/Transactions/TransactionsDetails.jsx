import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, IconButton, Menu, Text, Tooltip } from 'react-native-paper';
import { AddTransactionModal } from '../../components/AddTransactionModal/AddTransactionModal';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { isNilOrEmpty } from '../../utils/verifications';

const transactions = [
  { id: 1, value: 45.20, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 2, value: 45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 3, value: -45.2, operationTime: "2023-02-06T23:29:47.801Z" },
  { id: 4, value: 45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 5, value: -45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 6, value: -45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 7, value: 45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 8, value: 45.20, operationTime: "2023-02-06T23:29:47.801Z" },
  { id: 9, value: 45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 10, value: -45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 11, value: 45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 12, value: -45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 13, value: -45.2, operationTime: "2023-02-06T23:12:39.555Z" },
  { id: 14, value: 45.2, operationTime: "2023-02-06T23:29:47.801Z" },
];

export function TransactionsDetails({
  route,
  navigation,
}) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, payments or purchases
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);

  const consumerId = route?.params?.consumerId;
  const consumerName = route?.params?.consumerName;

  function handleFilterChange(filterChoice) {
    setSelectedFilter(filterChoice);
    setIsMenuVisible(false);
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
      />
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
        * Cliente: {consumerName}
      </HelperText>
      {renderTransactions()}
      <AddTransactionModal
        isVisible={addModalIsVisible}
        consumerId={consumerId}
        hideModal={() => setAddModalIsVisible(false)}
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
