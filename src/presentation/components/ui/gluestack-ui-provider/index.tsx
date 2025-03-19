
import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';

import { useColorScheme } from 'nativewind';
import { ToastProvider } from '@gluestack-ui/toast';
import { OverlayProvider } from '@gluestack-ui/overlay';

import { config } from './config';
import { ThemeMode } from './types';

export * from './types';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ThemeMode;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <View
      className="flex-1 h-full w-full"
      style={[
        config[colorScheme!],
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}

