import '@utils';
import '@/global.css';

import React from 'react';
import { StatusBar } from 'react-native';

import codePush from '@revopush/react-native-code-push';

import { firebase } from '@services';
import AppNavigator from './app-nav';
import { SplashPage } from '@screens';
import { navigationTheme } from '@themes';
import { AppProvider } from '@components';
import { useAppController } from './app-controller';
import { useScreenTracking, useTheme } from '@hooks';

function App(): React.JSX.Element {
  const { isLoggedIn } = useAppController();

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const { navigationRef, onReady, onNavigationStateChange } = useScreenTracking(
    routeName => {
      if (routeName) {
        firebase.analytics.logScreenView(routeName);
      }
    },
  );

  if (isLoggedIn === undefined) {
    return <SplashPage />;
  }

  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator
        theme={navigationTheme[theme]}
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onNavigationStateChange}
      />
    </AppProvider>
  );
}

export default codePush(App);
