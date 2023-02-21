import React, { useState } from 'react';
import { useConsumers } from '../../hooks/useConsumers';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { isNilOrEmpty } from '../../utils/verifications';
import { AddUpdateConsumerForm } from './AddUpdateConsumerForm';

export function AddUpdateConsumer({
  route,
  navigation,
}) {

  const isUpdate = !isNilOrEmpty(route?.params?.consumerId);

  const [name, setName] = useState(isUpdate ? route.params.consumerName : '');

  const addConsumer = useConsumers((state) => state.addConsumer);

  const updateConsumer = useConsumers((state) => state.updateConsumer);

  const { loading: addConsumerLoading } = useConsumers((state) => state.addConsumerData);

  const { loading: updateConsumerLoading } = useConsumers((state) => state.updateConsumerData);

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const showFeedbackMessage = useFeedbackMessage((state) => state.showFeedbackMessage);

  const isLoading = addConsumerLoading || updateConsumerLoading;

  const nameIsEmpty = isNilOrEmpty(name);

  function handleSuccess() {
    if (isUpdate) {
      showFeedbackMessage({
        message: "Cliente atualizado com sucesso!",
      });
    } else {
      showFeedbackMessage({
        message: "Cliente inserido com sucesso!",
      });
    }

    navigation.goBack();
  }

  function handleError() {
    if (isUpdate) {
      showErrorModal({
        title: 'Erro ao atualizar dados do cliente',
        description: `Não foi possível atualizar os dados do cliente "${name}" no momento`,
        buttonText: 'Entendi',
      });
    } else {
      showErrorModal({
        title: 'Erro ao adicionar novo cliente',
        description: `Não foi possível inserir o cliente "${name}" no momento`,
        buttonText: 'Entendi',
      });
    }
  }

  function handleSubmit() {
    if (nameIsEmpty) return;

    if (isUpdate) {
      const consumerNewData = {
        id: route.params.consumerId,
        name: name,
        balance: route.params.consumerBalance,
      };

      updateConsumer({
        consumerNewData,
        onSuccess: handleSuccess,
        onFail: handleError,
      });

    } else {
      addConsumer({
        newConsumerName: name,
        onSuccess: handleSuccess,
        onFail: handleError,
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
      handleSubmit={handleSubmit}
    />
  );
}
