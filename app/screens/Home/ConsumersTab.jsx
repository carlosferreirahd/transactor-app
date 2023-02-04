import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ConsumersList } from '../../components/ConsumersList/ConsumersList';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { Fab } from '../../components/Fab/Fab';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useQuery } from '../../hooks/useQuery';
import { SELECT_ALL_CONSUMERS } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';

export function ConsumersTab({
  navigation,
}) {

  const { showErrorModal } = useErrorHandler();

  const { loading, error, data, executeQuery } = useQuery();
  const consumers = data?.rows?._array;
  console.log({ consumers })

  const getAllConsumers = useCallback(() => {
    executeQuery({
      query: SELECT_ALL_CONSUMERS,
      params: [],
    });
  }, [executeQuery]);

  useEffect(() => {
    getAllConsumers();
  }, [getAllConsumers]);

  useEffect(() => {
    if (!isNilOrEmpty(error)) {
      showErrorModal({
        title: 'Erro ao buscar clientes',
        description: 'Não foi possível buscar a lista de clientes no banco de dados',
        buttonText: 'Tentar novamente',
        onButtonClick: getAllConsumers,
      });
    }
  }, [error]);

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

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      {isNilOrEmpty(consumers) ? renderEmptyState() : renderConsumersList()}
      <Fab onPress={() => navigation.navigate("AddUpdateConsumer", {
        refetchConsumers: getAllConsumers,
      })} />
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
