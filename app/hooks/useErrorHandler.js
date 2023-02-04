import { useContext } from "react";
import { ErrorHandlerContext } from "../providers/ErrorHandlerProvider";

export function useErrorHandler() {
  const context = useContext(ErrorHandlerContext);

  if (!context) {
    throw new Error('useErrorHandler must' +
      ' be used within a ErrorHandlerProvider');
  }

  return context;
}
