import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, HelperText, Modal, RadioButton, Text, TextInput } from 'react-native-paper';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useQuery } from '../../hooks/useQuery';
import { ADD_NEW_TRANSACTION } from '../../utils/queries';
import { isNilOrEmpty } from '../../utils/verifications';
import CurrencyInput from 'react-native-currency-input';

export function AddTransactionModal({
  consumerId,
  isVisible,
  hideModal,
  afterAddTransaction,
}) {

  const [value, setValue] = useState(0);
  const [type, setType] = useState('');

  const valueHasError = isNilOrEmpty(value) || isNaN(value) || Number(value) <= 0.0;
  const typeHasError = isNilOrEmpty(type);
  const hasErrors = valueHasError || typeHasError;

  const showErrorModal = useErrorHandler((state) => state.showErrorModal);

  const {
    loading: addLoading,
    error: addError,
    data: addData,
    executeQuery: addQuery,
  } = useQuery();

  const addTransactionByConsumerId = useCallback((transactionValue, transactionType) => {
    const signedValue = transactionType === "payment" ? Number(transactionValue) * -1 : Number(transactionValue);
    const finalValue = parseInt(signedValue * 100);
    const transactionDateTime = moment().format();

    addQuery({
      query: ADD_NEW_TRANSACTION,
      params: [finalValue, transactionDateTime, consumerId],
    });
  }, [addQuery]);

  useEffect(() => {
    if (!isNilOrEmpty(addData)) {

      const signedValue = type === "payment" ? Number(value) * -1 : Number(value);
      const addedValue = parseInt(signedValue * 100);

      if (afterAddTransaction) afterAddTransaction({ addedValue });

      handleHideModal();
    }
  }, [addData]);

  useEffect(() => {
    if (!isNilOrEmpty(addError)) {
      showErrorModal({
        title: "Erro ao adicionar transação",
        description: "Não foi possível adicionar esta transação no momento, tente novamente",
        buttonText: "Tentar novamente",
        onButtonClick: () => addTransactionByConsumerId(value),
      });
    }
  }, [addError]);

  function handleHideModal() {
    setValue('');
    setType('');

    if (hideModal) hideModal();
  }

  function handleButtonClick() {
    if (hasErrors) return;

    addTransactionByConsumerId(value, type);
  }

  return (
    <Modal
      visible={isVisible}
      onDismiss={handleHideModal}
      dismissable={!addLoading}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text
        variant="titleLarge"
      >
        Adicionar Transação
      </Text>
      <CurrencyInput
        value={value}
        onChangeValue={setValue}
        delimiter=","
        separator="."
        precision={2}
        minValue={0.0}
        renderTextInput={textInputProps =>
          <TextInput
            {...textInputProps}
            label="Valor da transação"
            disabled={addLoading}
            keyboardType="numeric"
            mode="outlined"
            left={<TextInput.Icon icon="currency-brl" />}
            style={styles.commonGap}
          />
        }
      />
      <HelperText type="info" visible={true}>
        Digite o valor da transação
      </HelperText>
      <Text
        variant="titleMedium"
        style={[styles.commonGap, styles.floatLeft]}
      >
        Tipo de transação:
      </Text>
      <RadioButton.Group
        value={type}
        onValueChange={value => setType(value)}
      >
        <RadioButton.Item
          label="Pagamento"
          value="payment"
          disabled={addLoading}
        />
        <RadioButton.Item
          label="Compra"
          value="purchase"
          disabled={addLoading}
        />
      </RadioButton.Group>
      <Button
        icon="plus-circle-outline"
        mode="contained"
        loading={addLoading}
        disabled={addLoading}
        onPress={handleButtonClick}
        style={[styles.commonGap, styles.submitButton]}
      >
        Adicionar
      </Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  contentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 10,
  },
  commonGap: {
    marginTop: 16,
  },
  floatLeft: {
    paddingLeft: 8,
    marginBottom: 8,
  },
  submitButton: {
    width: 150,
    alignSelf: 'flex-end',
  },
});
