import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';

export function AddUpdateConsumerForm({
  name,
  setName,
  isUpdate,
  isLoading,
  nameIsEmpty,
  handleSubmit,
}) {

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
        disabled={isLoading || nameIsEmpty}
        style={styles.submitButton}
        onPress={handleSubmit}
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
