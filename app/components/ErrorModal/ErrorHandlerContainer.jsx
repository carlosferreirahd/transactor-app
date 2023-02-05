import React from 'react';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { ErrorModal } from './ErrorModal';

export function ErrorHandlerContainer({
  children,
}) {

  const isVisible = useErrorHandler((state) => state.isVisible);
  const title = useErrorHandler((state) => state.title);
  const description = useErrorHandler((state) => state.description);
  const buttonText = useErrorHandler((state) => state.buttonText);
  const onButtonClick = useErrorHandler((state) => state.onButtonClick);
  const onHideModal = useErrorHandler((state) => state.onHideModal);

  return (
    <>
      {children}
      <ErrorModal
        isVisible={isVisible}
        title={title}
        description={description}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
        onHideModal={onHideModal}
      />
    </>
  );
}
