import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from '@/theme';

import NavigationApp from '@/navigation';
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationApp />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
