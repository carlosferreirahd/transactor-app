import React, { useCallback, useEffect, useState } from 'react';
import { useConsumers } from '../../hooks/useConsumers';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { useQuery } from '../../hooks/useQuery';
import { ADD_NEW_CONSUMER, UPDATE_CONSUMER } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';
import { AddUpdateConsumerForm } from './AddUpdateConsumerForm';

export function AddUpdateConsumer({
  route,
  navigation,
}) {

  const isUpdate = !isNilOrEmpty(route?.params?.consumerId);

  const [name, setName] = useState(isUpdate ? route.params.consumerName : '');

  const addConsumer = useConsumers((state) => state.addConsumer);

  const { loading: addConsumerLoading } = useConsumers((state) => state.addConsumerData);

  const updateConsumerFromStore = useConsumers((state) => state.updateConsumer);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const showFeedbackMessage = useFeedbackMessage((state) => state.showFeedbackMessage);

  const {
    loading: updateLoading,
    error: updateError,
    data: updateData,
    executeQuery: updateQuery,
  } = useQuery();

  const nameIsEmpty = isNilOrEmpty(name);

  const isLoading = addConsumerLoading || updateLoading;

  function handleAddConsumerSuccess() {
    showFeedbackMessage({
      message: "Cliente inserido com sucesso!",
    });

    navigation.goBack();
  }

  function handleAddConsumerError() {
    showErrorModal({
      title: 'Erro ao adicionar novo cliente',
      description: `Não foi possível adicionar o cliente "${name}" no momento`,
      buttonText: 'Tentar novamente',
    });
  }

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

  // handle success
  useEffect(() => {
    if (!isNilOrEmpty(updateData) && isUpdate) {
      showFeedbackMessage({
        message: "Cliente atualizado com sucesso!",
      });

      const consumerId = route.params.consumerId;
      const consumerBalance = route.params.consumerBalance;

      updateConsumerFromStore({
        consumerId,
        newConsumerName: name,
        newConsumerBalance: consumerBalance,
      });

      navigation.goBack();
    }
  }, [updateData, isUpdate]);

  // handle error
  useEffect(() => {
    if (!isNilOrEmpty(updateError) && isUpdate) {
      showErrorModal({
        title: 'Erro ao atualizar dados do cliente',
        description: `Não foi possível atualizar os dados do cliente "${name}" no momento`,
        buttonText: 'Tentar novamente',
      });
    }
  }, [updateError, isUpdate]);

  function handleButtonClick() {
    if (nameIsEmpty) return;

    if (isUpdate) {
      updateConsumer(name);
    } else {
      addConsumer({
        newConsumerName: name,
        onSuccess: handleAddConsumerSuccess,
        onFail: handleAddConsumerError,
      });
    }
  }

  return (
    <AddUpdateConsumerForm
      name={name}
      setName={setName}
      isUpdate={isUpdate}
      isLoading={isLoading}
      nameIsEmpty={nameIsEmpty}
      handleButtonClick={handleButtonClick}
    />
  );
}
