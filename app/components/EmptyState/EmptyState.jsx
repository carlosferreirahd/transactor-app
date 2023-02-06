import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Avatar,
} from 'react-native-paper';

export function EmptyState({
  icon = '',
  description = '',
}) {

  return (
    <View style={styles.emptyStateContainer}>
      <Avatar.Icon
        icon={icon}
        size={200}
        style={styles.emptyStateAvatar}
      />
      <Text
        variant="headlineLarge"
        style={styles.emptyStateDescription}
      >
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyStateAvatar: {
    alignSelf: 'center',
  },
  emptyStateDescription: {
    color: 'rgba(0, 0, 0, 0.45)',
    paddingTop: 16,
    textAlign: 'center',
  }
});
