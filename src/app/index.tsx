import '@utils';
import '@/global.css';

import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from '@hooks';
import AppNavigator from './app-nav';
import { SplashPage } from '@screens';
import { navigationTheme } from '@themes';
import { AppProvider } from '@components';
import { useAppController } from './app-controller';

function App(): React.JSX.Element {
  const { isLoggedIn } = useAppController();

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  if (isLoggedIn === undefined) {
    return <SplashPage />;
  }
  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator theme={navigationTheme[theme]} />
    </AppProvider>
  );
}

export default App;
