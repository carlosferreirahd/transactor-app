import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from './app/hooks/useTheme';
import { Router } from './Router';
import { DatabaseProvider } from './app/providers/DatabaseProvider';
import { ErrorHandlerProvider } from './app/providers/ErrorHandlerProvider';
import { FeedbackMessageProvider } from './app/providers/FeedbackMessageProvider';

import 'react-native-gesture-handler';

export default function App() {

  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <ErrorHandlerProvider>
        <FeedbackMessageProvider>
          <DatabaseProvider>
            <Router />
          </DatabaseProvider>
        </FeedbackMessageProvider>
      </ErrorHandlerProvider>
    </PaperProvider>
  );
}
