import '@/global.css';
import '@src/utils/i18n';

import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from '@hooks';
import AppNavigator from './app-nav';
import { navigationTheme } from '@themes';
import { AppProvider } from '@components';

function App(): React.JSX.Element {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator theme={navigationTheme[theme]} />
    </AppProvider>
  );
}

export default App;
