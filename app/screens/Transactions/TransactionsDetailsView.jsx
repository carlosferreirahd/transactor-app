import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  HelperText,
  IconButton,
  Menu,
  Surface,
  Text,
  Tooltip,
} from 'react-native-paper';
import { AddTransactionModal } from '../../components/AddTransactionModal/AddTransactionModal';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList';
import { isNilOrEmpty } from '../../utils/verifications';
import { formatNumber } from 'react-native-currency-input';

export function TransactionsDetailsView({
  consumerId,
  currentConsumerInfo,
  transactions,
  isLoading,
  handleAfterTransactionOperation,
}) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, payments or purchases
  const [addModalIsVisible, setAddModalIsVisible] = useState(false);

  const treatedBalance = (currentConsumerInfo.balance || 0) / 100;

  const formattedValue = formatNumber(treatedBalance, {
    separator: ',',
    prefix: 'R$ ',
    precision: 2,
    delimiter: '.',
    signPosition: 'beforePrefix',
  });

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
      <Surface
        style={styles.surfaceContainer}
        elevation={4}
      >
        <TransactionsList
          transactions={transactions}
          filterType={selectedFilter}
          canDelete={true}
          afterDeleteTransaction={handleAfterTransactionOperation}
        />
      </Surface>
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
        * Valor que o cliente deve: {formattedValue}
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
  surfaceContainer: {
    borderRadius: 8,
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
