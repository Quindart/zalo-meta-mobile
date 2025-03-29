import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from '@/theme';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';

import NavigationApp from '@/navigation';
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationApp />
      </PaperProvider>
    </Provider>
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
