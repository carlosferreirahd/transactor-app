import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from './app/hooks/useTheme';
import { Router } from './Router';
import { ErrorHandlerContainer } from './app/components/ErrorModal/ErrorHandlerContainer';
import { FeedbackMessageContainer } from './app/components/FeedbackMessage/FeedbackMessageContainer';
import { DatabaseLoader } from './app/components/DatabaseLoader/DatabaseLoader';
import moment from 'moment';

import 'moment/locale/pt-br'

import 'react-native-gesture-handler';

export default function App() {

  const theme = useTheme();

  moment.locale('pt-br');

  return (
    <PaperProvider theme={theme}>
      <ErrorHandlerContainer>
        <FeedbackMessageContainer>
          <DatabaseLoader>
            <Router />
          </DatabaseLoader>
        </FeedbackMessageContainer>
      </ErrorHandlerContainer>
    </PaperProvider>
  );
}
