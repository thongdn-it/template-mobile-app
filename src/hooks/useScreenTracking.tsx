import React from 'react';

import { useNavigationContainerRef } from '@react-navigation/native';

export const useScreenTracking = (
  onTrackingScreen: (routeName: string | undefined) => void,
) => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef<string | undefined>(undefined);

  const onReady = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };

  const onNavigationStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    if (previousRouteName !== currentRouteName) {
      onTrackingScreen(currentRouteName);
    }

    routeNameRef.current = currentRouteName;
  };

  return {
    navigationRef,
    onReady,
    onNavigationStateChange,
  };
};
