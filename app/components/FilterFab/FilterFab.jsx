import React from 'react';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export function FilterFab({
  isOpen,
  actions,
  onStateChange,
}) {

  return (
    <FAB.Group
      visible
      open={isOpen}
      icon={"filter-variant"}
      actions={actions}
      onStateChange={onStateChange}
      style={styles.fab}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    margin: 8,
    right: 0,
    bottom: 0,
  },
})
