import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import { isNilOrEmpty } from '../../utils/verifications';

export function AddUpdateConsumer({
  route,
  navigation,
}) {

  const [consumerName, setConsumerName] = useState('');

  const hasErrors = isNilOrEmpty(consumerName);

  function handleButtonClick() {
    if (hasErrors) return;
  }

  return (
    <View style={styles.viewContainer}>
      <Text variant="headlineLarge">
        Adicionar cliente
      </Text>
      <TextInput
        label="Nome do cliente"
        mode="outlined"
        value={consumerName}
        onChangeText={text => setConsumerName(text)}
        left={<TextInput.Icon icon="account" />}
        style={styles.userInput}
      />
      <HelperText type="info" visible={hasErrors}>
        O nome deve ser preenchido
      </HelperText>
      <Button
        icon={"account-plus"}
        mode="contained"
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
