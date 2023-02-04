import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Text, Button, Avatar } from 'react-native-paper';

export function ErrorModal({
  isVisible,
  title,
  description,
  buttonText,
  onButtonClick,
  onHideModal,
}) {

  function handleButtonClick() {
    if (onButtonClick) onButtonClick();

    if (onHideModal) onHideModal();
  }

  return (
    <Modal
      visible={isVisible}
      dismissable={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Avatar.Icon
        size={48}
        icon="alert-circle-outline"
        style={styles.errorIcon}
      />
      <Text
        variant="titleLarge"
        style={styles.title}
      >
        {title}
      </Text>
      <Text
        variant="titleMedium"
        style={styles.description}
      >
        {description}
      </Text>
      <Button
        mode="text"
        onPress={handleButtonClick}
        style={styles.button}
      >
        {buttonText || "Entendi"}
      </Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginTop: 100,
  },
  contentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorIcon: {
    backgroundColor: "rgb(186, 26, 26)",
  },
  title: {
    marginTop: 16,
  },
  description: {
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  }
});
