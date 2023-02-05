import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useConsumers } from '../../hooks/useConsumers';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { useQuery } from '../../hooks/useQuery';
import { ADD_NEW_CONSUMER } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';

export function AddUpdateConsumer({
  route,
  navigation,
}) {

  const [name, setName] = useState('');

  const { showErrorModal } = useErrorHandler();

  const { showFeedbackMessage } = useFeedbackMessage();

  const {
    loading: addLoading,
    error: addError,
    data: addData,
    executeQuery: addQuery,
  } = useQuery();

  const addConsumerToStore = useConsumers((state) => state.addConsumer);

  const addNewConsumer = useCallback((consumerName) => {
    addQuery({
      query: ADD_NEW_CONSUMER,
      params: [consumerName],
    });
  }, [addQuery]);

  const nameIsEmpty = isNilOrEmpty(name);
  const isLoading = addLoading;

  // handle success
  useEffect(() => {
    if (!isNilOrEmpty(addData)) {
      showFeedbackMessage({
        message: "Cliente inserido com sucesso!",
      });

      const newId = addData?.insertId;

      const addedConsumer = {
        id: newId,
        name: name,
        balance: 0.0,
      };

      addConsumerToStore(addedConsumer);

      navigation.goBack();
    }
  }, [addData]);

  // handle error
  useEffect(() => {
    if (!isNilOrEmpty(addError)) {
      showErrorModal({
        title: 'Erro ao adicionar novo cliente',
        description: `Não foi possível adicionar o cliente "${name}" no momento`,
        buttonText: 'Tentar novamente',
      });
    }
  }, [addError]);

  function handleButtonClick() {
    if (nameIsEmpty) return;

    addNewConsumer(name);
  }

  return (
    <View style={styles.viewContainer}>
      <Text variant="headlineLarge">
        Adicionar cliente
      </Text>
      <TextInput
        label="Nome do cliente"
        mode="outlined"
        value={name}
        disabled={isLoading}
        onChangeText={text => setName(text)}
        left={<TextInput.Icon icon="account" />}
        style={styles.userInput}
      />
      <HelperText type="info" visible={nameIsEmpty}>
        O nome deve ser preenchido
      </HelperText>
      <Button
        icon={"account-plus"}
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        onPress={handleButtonClick}
      >
        Adicionar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  userInput: {
    marginTop: 16,
  },
  submitButton: {
    width: 150,
    marginTop: 16,
    alignSelf: 'flex-end',
  }
});
