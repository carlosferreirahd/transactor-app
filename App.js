import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from './app/hooks/useTheme';
import { Router } from './Router';
import { DatabaseProvider } from './app/providers/DatabaseProvider';
import { ErrorHandlerProvider } from './app/providers/ErrorHandlerProvider';
import { FeedbackMessageContainer } from './app/components/FeedbackMessage/FeedbackMessageContainer';

import 'react-native-gesture-handler';

export default function App() {

  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <ErrorHandlerProvider>
        <FeedbackMessageContainer>
          <DatabaseProvider>
            <Router />
          </DatabaseProvider>
        </FeedbackMessageContainer>
      </ErrorHandlerProvider>
    </PaperProvider>
  );
}
