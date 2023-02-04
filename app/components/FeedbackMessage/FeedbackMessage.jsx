import React from 'react';
import { Snackbar } from 'react-native-paper';

export function FeedbackMessage({
  isVisible,
  message,
  onHideSnackbar,
}) {

  return (
    <Snackbar
      visible={isVisible}
      icon="check-circle-outline"
      duration={3000}
      onIconPress={onHideSnackbar}
      onDismiss={onHideSnackbar}
    >
      {message}
    </Snackbar>
  );
}
