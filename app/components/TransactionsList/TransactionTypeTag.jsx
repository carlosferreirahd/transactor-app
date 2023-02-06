import React from 'react';
import { Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export function TransactionTypeTag({
  type,
}) {

  const title = type === 'payment' ? "Pagamento" : "Compra";

  return (
    <View
      style={[styles.chipContainer, type === 'payment' ? styles.paymentBorderColor : styles.purchaseBorderColor]}
    >
      <Text
        variant="labelSmall"
        style={[styles.textContainer, type === 'payment' ? styles.paymentColor : styles.purchaseColor]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 2,
  },
  textContainer: {
    fontWeight: 'bold',
    padding: 2,
    alignSelf: 'center',
  },
  paymentColor: {
    color: '#005bc1',
  },
  paymentBorderColor: {
    borderColor: '#005bc1',
  },
  purchaseColor: {
    color: '#00c166',
  },
  purchaseBorderColor: {
    borderColor: '#00c166',
  },
});
