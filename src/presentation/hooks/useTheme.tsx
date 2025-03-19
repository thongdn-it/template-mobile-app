import React from 'react';

import { useColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeMode } from '../components';

export const useTheme = () => {
  const THEME_MODE_KEY = 'theme_mode';

  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setMode] = React.useState<ThemeMode>(
    colorScheme == 'dark' ? 'dark' : 'light',
  );

  const setTheme = (mode: ThemeMode) => {
    setColorScheme(mode);
    setMode(mode);
    AsyncStorage.setItem(THEME_MODE_KEY, mode);
  };

  React.useEffect(() => {
    AsyncStorage.getItem(THEME_MODE_KEY).then(value => {
      if (value) {
        setTheme(value as ThemeMode);
      }
    });
  }, []);

  return {
    theme,
    setTheme,
  };
};
