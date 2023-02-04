import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Router } from './Router';

export default function App() {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
}
