import { getVersion, getBuildNumber } from 'react-native-device-info';

import { Locale } from '@utils';
import { useAppStore } from '@stores';
import { useI18n, useTheme } from '@hooks';

export const useSettingPageController = () => {
  const { theme, setTheme } = useTheme();
  const { currentLanguage, changeLanguage: changeLanguageI18n } = useI18n();
  const { setIsLoggedIn } = useAppStore();

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (language: Locale) => {
    changeLanguageI18n(language);
  };

  const signOut = () => {
    // sign out logic
    setIsLoggedIn(false);
  };

  return {
    version: getVersion(),
    buildNumber: getBuildNumber(),
    currentLanguage,
    isDarkMode: theme === 'dark',
    changeTheme,
    changeLanguage,
    signOut,
  };
};
