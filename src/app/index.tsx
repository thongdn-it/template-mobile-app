import '@/global.css';
import '@src/utils/i18n';

import React from 'react';
import { StatusBar } from 'react-native';

import AppNavigator from './app-nav';
import { analytics } from '@services';
import { navigationTheme } from '@themes';
import { AppProvider } from '@components';
import { useScreenTracking, useTheme } from '@hooks';

function App(): React.JSX.Element {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const { navigationRef, onReady, onNavigationStateChange } = useScreenTracking(
    routeName => {
      if (routeName) {
        analytics.logScreenView(routeName);
      }
    },
  );

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

export default App;
