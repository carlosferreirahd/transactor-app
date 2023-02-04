import { useContext } from "react";
import { FeedbackMessageContext } from "../providers/FeedbackMessageProvider";

export function useFeedbackMessage() {
  const context = useContext(FeedbackMessageContext);

  if (!context) {
    throw new Error('useFeedbackMessage must' +
      ' be used within a FeedbackMessageProvider');
  }

  return context;
}
