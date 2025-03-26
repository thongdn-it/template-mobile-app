import React from 'react';

import { useTheme } from '@hooks';
import { GluestackUIProvider } from '../ui/gluestack-ui-provider';

export const ThemeProvider = (
  props: React.ComponentProps<typeof GluestackUIProvider>,
) => {
  const { theme } = useTheme();

  return <GluestackUIProvider {...props} mode={theme} />;
};
