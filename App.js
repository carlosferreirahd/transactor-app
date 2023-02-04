import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from './app/hooks/useTheme';
import { Router } from './Router';
import { DatabaseProvider } from './app/providers/DatabaseProvider';

import 'react-native-gesture-handler';

export default function App() {

  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <DatabaseProvider>
        <Router />
      </DatabaseProvider>
    </PaperProvider>
  );
}
