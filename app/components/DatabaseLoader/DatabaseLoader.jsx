import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { configDatabase } from '../../database/configDatabase';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export function DatabaseLoader({
  children,
}) {

  const [loadingDatabase, setLoadingDatabase] = useState(true);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const loadDatabase = useCallback(() => {
    setLoadingDatabase(true);
    configDatabase()
      .then(() => console.log("-- DATABASE LOADED! --"))
      .catch(() => showErrorModal({
        title: 'Erro ao carregar banco de dados',
        description: 'Não foi possível gerar as tabelas do banco',
        buttonText: 'Tentar novamente',
        onButtonClick: loadDatabase,
      }))
      .finally(() => setLoadingDatabase(false));
  }, [configDatabase]);

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

  return loadingDatabase ? renderLoading() : renderApp();
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
