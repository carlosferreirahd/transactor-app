import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Avatar,
} from 'react-native-paper';

export function EmptyState({
  icon = '',
  description = '',
  style,
}) {

  return (
    <View style={[styles.emptyStateContainer, style]}>
      <Avatar.Icon
        icon={icon}
        size={200}
        style={styles.emptyStateAvatar}
      />
      <Text
        variant="headlineMedium"
        style={styles.emptyStateDescription}
      >
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
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
