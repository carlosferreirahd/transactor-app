import {
  createContext,
  useCallback,
  useState,
} from "react";
import { FeedbackMessage } from "../components/FeedbackMessage/FeedbackMessage";

const FeedbackMessageContextData = {
  showFeedbackMessage: () => null,
};

const FeedbackMessageContext = createContext(FeedbackMessageContextData);

function FeedbackMessageProvider({
  children,
}) {

  const [feedbackMessageState, setFeedbackMessageState] = useState({
    visible: false,
    message: '',
  });

  const showFeedbackMessage = useCallback(({ message }) => {
    setFeedbackMessageState({
      visible: true,
      message,
    });
  }, []);

  const hideFeedbackMessage = useCallback(() => {
    setFeedbackMessageState({
      visible: false,
      message: '',
    });
  }, []);

  return (
    <FeedbackMessageContext.Provider
      value={{
        showFeedbackMessage,
      }}
    >
      {children}
      <FeedbackMessage
        isVisible={feedbackMessageState.visible}
        message={feedbackMessageState.message}
        onHideSnackbar={hideFeedbackMessage}
      />
    </FeedbackMessageContext.Provider>
  );
}

export { FeedbackMessageProvider, FeedbackMessageContext };
