import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { configDatabase } from '../../database/configDatabase';
import { useConsumers } from '../../hooks/useConsumers';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useTransactions } from '../../hooks/useTransactions';

export function DatabaseLoader({
  children,
}) {

  const [loadingDatabase, setLoadingDatabase] = useState(true);

  const fetchConsumers = useConsumers((state) => state.fetchConsumers);

  const fetchTransactions = useTransactions((state) => state.fetchTransactions);

  const { loading: fetchConsumersLoading } = useConsumers((state) => state.fetchConsumersData);

  const { loading: fetchTransactionsLoading } = useTransactions((state) => state.fetchTransactionsData);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const isLoading = loadingDatabase || fetchConsumersLoading || fetchTransactionsLoading;

  const loadDatabase = useCallback(() => {
    setLoadingDatabase(true);

    configDatabase()
      .then(() => {
        // fetching all consumers from db, storing in useConsumers store
        fetchConsumers({
          onFail: handleFetchConsumersError,
        });

        // fetching all transactions from db, storing in useTransactions store
        fetchTransactions({
          onFail: handleFetchTransactionsError,
        });
      })
      .catch(() => showErrorModal({
        title: 'Erro ao carregar banco de dados',
        description: 'Não foi possível gerar as tabelas do banco',
        buttonText: 'Tentar novamente',
        onButtonClick: loadDatabase,
      }))
      .finally(() => setLoadingDatabase(false));
  }, [configDatabase]);

  function handleFetchConsumersError() {
    showErrorModal({
      title: 'Erro ao buscar clientes',
      description: 'Não foi possível buscar a lista de clientes no banco de dados',
      buttonText: 'Tentar novamente',
      onButtonClick: loadDatabase, // retry
    });
  }

  function handleFetchTransactionsError() {
    showErrorModal({
      title: 'Erro ao buscar transações',
      description: 'Não foi possível selecionar as transações do banco de dados',
      buttonText: 'Tentar novamente',
      onButtonClick: loadDatabase, // retry
    });
  }

  useEffect(() => {
    loadDatabase();
  }, [loadDatabase]);

  const renderLoading = () => (
    <View style={styles.viewContainer}>
      <ActivityIndicator
        animating={true}
        size="large"
      />
    </View>
  );

  const renderApp = () => (
    <>
      {children}
    </>
  )

  return isLoading ? renderLoading() : renderApp();
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
