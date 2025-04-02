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
        <ThemeProvider>
          <LanguageProvider>
            <QueryProvider>{children}</QueryProvider>
          </LanguageProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};
