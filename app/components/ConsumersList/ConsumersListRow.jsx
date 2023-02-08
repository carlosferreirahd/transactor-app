import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  List,
  Text,
  Avatar,
  IconButton,
  Menu,
} from 'react-native-paper';
import Currency from 'react-currency-formatter';

export function ConsumersListRow({
  consumer,
  navigation,
}) {

  const [actionsVisible, setActionsVisible] = useState(false);

  const { id, name, balance } = consumer;

  const renderConsumerName = () => (
    <Text
      variant="titleLarge"
    >
      {name}
    </Text>
  );

  const renderConsumerBalance = () => (
    <Text
      variant="titleSmall"
      style={styles.description}
    >
      <Currency quantity={balance} currency="BRL" />
    </Text>
  );

  const renderConsumerIcon = () => (
    <Avatar.Icon
      icon="account-circle"
      size={48}
      style={styles.avatarIcon}
    />
  );

  const renderUserActions = () => (
    <Menu
      visible={actionsVisible}
      onDismiss={() => setActionsVisible(false)}
      anchor={<IconButton icon="dots-horizontal" onPress={() => setActionsVisible(true)} />}
    >
      <Menu.Item
        onPress={() => {
          navigation.navigate("AddUpdateConsumer", {
            consumerId: id,
            consumerName: name,
            consumerBalance: balance,
          });
          setActionsVisible(false);
        }}
        title="Editar cliente"
        leadingIcon="pencil"
      />
    </Menu>
  );

  return (
    <List.Item
      title={renderConsumerName()}
      description={renderConsumerBalance()}
      left={props => renderConsumerIcon()}
      right={props => renderUserActions()}
      onPress={() => {
        navigation.navigate("TransactionsDetails", {
          consumerId: id,
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  avatarIcon: {
    alignSelf: "center",
    marginLeft: 16,
    marginRight: 0,
  },
  description: {
    color: 'rgba(0, 0, 0, 0.45)',
  },
});
