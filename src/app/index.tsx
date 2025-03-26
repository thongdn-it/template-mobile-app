import '@/global.css';
import '@utils';

import React from 'react';
import { StatusBar } from 'react-native';

import codePush from '@revopush/react-native-code-push';

import { SplashPage } from '@pages';
import AppNavigator from './app-nav';
import { useTheme } from '@hooks';
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

export default codePush(App);
