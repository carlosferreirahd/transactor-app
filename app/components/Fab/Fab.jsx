import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export function Fab({
  onPress,
}) {

  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
})
