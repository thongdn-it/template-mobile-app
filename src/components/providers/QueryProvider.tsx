import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

export const QueryProvider = ({
  children,
  config,
}: Readonly<{
  children: React.ReactNode;
  config?: QueryClientConfig;
}>) => {
  const queryClient = new QueryClient(config);

  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
