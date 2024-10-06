import React from 'react';
import AppNavigator from './src/navigation/navigator';
import { SafeAreaView } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
