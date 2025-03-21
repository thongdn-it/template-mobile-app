import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { LanguageProvider } from './LanguageProvider';

export const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <KeyboardProvider>
      <LanguageProvider>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </LanguageProvider>
    </KeyboardProvider>
  );
};
