'use client';

import React, { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { SafeAreaView, View } from '@components';

type Props = ViewProps & {
  safeArea?: boolean;
};

export const PageView = forwardRef<View | SafeAreaView, Props>((props, ref) => {
  if (props.safeArea === false) {
    return <View className="flex-1" ref={ref} {...props} />;
  }
  return <SafeAreaView className="flex-1" ref={ref} {...props} />;
});
