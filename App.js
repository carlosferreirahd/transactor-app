import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { useTheme } from './app/hooks/useTheme';
import { Router } from './Router';

import 'react-native-gesture-handler';

export default function App() {

  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Router />
    </PaperProvider>
  );
}
