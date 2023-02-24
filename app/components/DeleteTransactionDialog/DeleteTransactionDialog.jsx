import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export function DeleteTransactionDialog({
  visible,
  loading,
  onOk,
  onDismiss,
}) {

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Icon
          icon="alert"
          size={48}
        />
        <Dialog.Title style={styles.textCenter}>
          Deletar Transação?
        </Dialog.Title>
        <Dialog.Content>
          <Text
            variant="bodyLarge"
            style={styles.textCenter}
          >
            Ao deletar, o saldo do usuário será atualizado automaticamente
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onDismiss}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onPress={onOk}
            disabled={loading}
            textColor="rgb(186, 26, 26)"
          >
            Deletar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
});
