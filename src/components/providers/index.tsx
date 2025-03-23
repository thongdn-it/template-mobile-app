import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { LanguageProvider } from './LanguageProvider';

export const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <LanguageProvider>
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </LanguageProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};
