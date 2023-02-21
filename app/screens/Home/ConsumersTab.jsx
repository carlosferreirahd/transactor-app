import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ConsumersList } from '../../components/ConsumersList/ConsumersList';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Fab } from '../../components/Fab/Fab';
import { useConsumers } from '../../hooks/useConsumers';
import { isNilOrEmpty } from '../../utils/verifications';

export function ConsumersTab({
  navigation,
}) {

  const consumers = useConsumers((state) => state.consumers);

  const renderEmptyState = () => (
    <EmptyState
      icon="account-multiple-plus-outline"
      description="Insira novos clientes"
    />
  );

  const renderConsumersList = () => (
    <ConsumersList
      consumers={consumers}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.viewContainer}>
      {isNilOrEmpty(consumers) ? renderEmptyState() : renderConsumersList()}
      <Fab onPress={() => navigation.navigate("AddUpdateConsumer")} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
