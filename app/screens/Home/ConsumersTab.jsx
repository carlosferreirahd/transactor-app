import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
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

  return (
    <View>
    </View>
  );
}
