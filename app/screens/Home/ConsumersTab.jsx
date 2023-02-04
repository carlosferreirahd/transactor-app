import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useQuery } from '../../hooks/useQuery';
import { SELECT_ALL_CONSUMERS } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';

export function ConsumersTab() {

  const { showErrorModal } = useErrorHandler();

  const { loading, error, data, executeQuery } = useQuery();
  const consumers = data?.rows?._array;
  console.log({ loading, error, data, consumers });

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

  if (loading) {
    return (
      <View style={styles.viewContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      {isNilOrEmpty(consumers) ? renderEmptyState() : null}
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
