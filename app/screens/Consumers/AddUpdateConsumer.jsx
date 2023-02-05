import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { useConsumers } from '../../hooks/useConsumers';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { useQuery } from '../../hooks/useQuery';
import { ADD_NEW_CONSUMER, UPDATE_CONSUMER } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';

export function AddUpdateConsumer({
  route,
  navigation,
}) {

  const isUpdate = !isNilOrEmpty(route?.params?.consumerId);

  const [name, setName] = useState(isUpdate ? route.params.consumerName : '');

  const { showErrorModal } = useErrorHandler();

  const { showFeedbackMessage } = useFeedbackMessage();

  const {
    loading: addLoading,
    error: addError,
    data: addData,
    executeQuery: addQuery,
  } = useQuery();

  const {
    loading: updateLoading,
    error: updateError,
    data: updateData,
    executeQuery: updateQuery,
  } = useQuery();

  const addConsumerToStore = useConsumers((state) => state.addConsumer);
  const updateConsumerFromStore = useConsumers((state) => state.updateConsumer);

  const addNewConsumer = useCallback((consumerName) => {
    addQuery({
      query: ADD_NEW_CONSUMER,
      params: [consumerName],
    });
  }, [addQuery]);

  const updateConsumer = useCallback((consumerName) => {
    const consumerId = route.params.consumerId;
    const consumerBalance = route.params.consumerBalance;

    updateQuery({
      query: UPDATE_CONSUMER,
      params: [
        consumerName,
        consumerBalance,
        consumerId,
      ],
    });
  }, [updateQuery]);

  const nameIsEmpty = isNilOrEmpty(name);
  const isLoading = addLoading || updateLoading;

  // handle success
  useEffect(() => {
    if (!isNilOrEmpty(addData) && !isUpdate) {
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

    if (!isNilOrEmpty(updateData) && isUpdate) {
      showFeedbackMessage({
        message: "Cliente atualizado com sucesso!",
      });

      const consumerId = route.params.consumerId;

      updateConsumerFromStore({
        consumerId,
        newConsumerName: name,
      });

      navigation.goBack();
    }
  }, [addData, updateData, isUpdate]);

  // handle error
  useEffect(() => {
    if (!isNilOrEmpty(addError) && !isUpdate) {
      showErrorModal({
        title: 'Erro ao adicionar novo cliente',
        description: `Não foi possível adicionar o cliente "${name}" no momento`,
        buttonText: 'Tentar novamente',
      });
    }

    if (!isNilOrEmpty(updateError) && isUpdate) {
      showErrorModal({
        title: 'Erro ao atualizar dados do cliente',
        description: `Não foi possível atualizar os dados do cliente "${name}" no momento`,
        buttonText: 'Tentar novamente',
      });
    }
  }, [addError, updateError, isUpdate]);

  function handleButtonClick() {
    if (nameIsEmpty) return;

    isUpdate ? updateConsumer(name) : addNewConsumer(name);
  }

  return (
    <View style={styles.viewContainer}>
      <Text variant="headlineLarge">
        {`${isUpdate ? "Atualizar" : "Adicionar"} Cliente`}
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
        icon={isUpdate ? "account-edit" : "account-plus"}
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        onPress={handleButtonClick}
      >
        {`${isUpdate ? "Atualizar" : "Adicionar"}`}
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
