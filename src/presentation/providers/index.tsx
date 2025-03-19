import { ThemeProvider } from './ThemeProvider';
import { LanguageProvider } from './LanguageProvider';

export * from './ThemeProvider';

export const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
};
