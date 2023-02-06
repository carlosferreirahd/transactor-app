import React, { useState } from 'react';
import { IconButton, List, Menu, Text } from 'react-native-paper';
import Currency from 'react-currency-formatter';
import { TransactionTypeTag } from './TransactionTypeTag';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

export function TransactionsListRow({
  transaction,
}) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const {
    value,
    operationTime,
  } = transaction;

  const formattedOperationTime = moment(operationTime).format('DD/MM/YYYY [às] HH:mm');

  const renderRightContent = () => (
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
        onPress={() => console.log('delete')}
        leadingIcon="delete"
      />
    </Menu>
  );

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