import React from 'react';
import { useFeedbackMessage } from '../../hooks/useFeedbackMessage';
import { FeedbackMessage } from './FeedbackMessage';

export function FeedbackMessageContainer({
  children,
}) {

  const isVisible = useFeedbackMessage((state) => state.isVisible);
  const message = useFeedbackMessage((state) => state.message);
  const onHideSnackbar = useFeedbackMessage((state) => state.onHideSnackbar);

  return (
    <>
      {children}
      <FeedbackMessage
        isVisible={isVisible}
        message={message}
        onHideSnackbar={onHideSnackbar}
      />
    </>
  );
}
