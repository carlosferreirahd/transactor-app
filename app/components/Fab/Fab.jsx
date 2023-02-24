import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

export function Fab({
  icon,
  onPress,
}) {

  return (
    <FAB
      icon={icon}
      onPress={onPress}
      style={styles.fab}
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
