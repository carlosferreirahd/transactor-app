import {
  createContext,
  useCallback,
  useState,
} from "react";
import { ErrorModal } from "../components/ErrorModal/ErrorModal";

const ErrorHandlerContextData = {
  showErrorModal: () => null,
};

const ErrorHandlerContext = createContext(ErrorHandlerContextData);

function ErrorHandlerProvider({
  children,
}) {

  const [errorModalState, setErrorModalState] = useState({
    visible: false,
    title: '',
    description: '',
    buttonText: '',
    onButtonClick: () => null,
  });

  const showErrorModal = useCallback(({
    title,
    description,
    buttonText,
    onButtonClick,
  }) => {
    setErrorModalState({
      visible: true,
      title,
      description,
      buttonText,
      onButtonClick,
    });
  }, []);

  const hideErrorModal = useCallback(() => {
    setErrorModalState({
      visible: false,
      title: '',
      description: '',
      buttonText: '',
      onButtonClick: () => null,
    });
  }, []);

  return (
    <ErrorHandlerContext.Provider
      value={{
        showErrorModal,
      }}
    >
      {children}
      <ErrorModal
        isVisible={errorModalState.visible}
        title={errorModalState.title}
        description={errorModalState.description}
        buttonText={errorModalState.buttonText}
        onButtonClick={errorModalState.onButtonClick}
        onHideModal={hideErrorModal}
      />
    </ErrorHandlerContext.Provider>
  );
}

export { ErrorHandlerProvider, ErrorHandlerContext };
