import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, HelperText, Modal, RadioButton, Text, TextInput } from 'react-native-paper';
import { isNilOrEmpty } from '../../utils/verifications';

export function AddTransactionModal({
  isVisible,
  hideModal,
  consumerId,
}) {

  const [value, setValue] = useState('');
  const [type, setType] = useState('');

  const valueHasError = isNilOrEmpty(value) || isNaN(value);
  const typeHasError = isNilOrEmpty(type);
  const hasErrors = valueHasError || typeHasError;

  function handleHideModal() {
    setValue('');
    setType('');

    if (hideModal) hideModal();
  }

  function handleButtonClick() {
    if (hasErrors) return;

    console.log('value', value);
    console.log('type', type);
  }

  return (
    <Modal
      visible={isVisible}
      onDismiss={handleHideModal}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text
        variant="titleLarge"
      >
        Adicionar Transação
      </Text>
      <TextInput
        label="Valor da transação"
        value={value}
        keyboardType="numeric"
        mode="outlined"
        onChangeText={(text) => {
          const formattedValue = text.replace(/[^\d.]/g, '');
          setValue(formattedValue);
        }}
        left={<TextInput.Icon icon="currency-brl" />}
        style={styles.commonGap}
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
        />
        <RadioButton.Item
          label="Compra"
          value="purchase"
        />
      </RadioButton.Group>
      <Button
        icon="plus-circle-outline"
        mode="contained"
        // loading={isLoading}
        // disabled={isLoading}
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
