'use client';

import React, { forwardRef, useEffect } from 'react';
import { ViewProps } from 'react-native';

import { firebase } from '@services';
import { View } from '../../ui/view';
import { SafeAreaView } from '../../ui/safe-area-view';

type Props = ViewProps & {
  safeArea?: boolean;
  pageName?: string;
  attributes?: { [key: string]: string };
};

export const PageView = forwardRef<View | SafeAreaView, Props>((props, ref) => {
  useEffect(() => {
    if (props.pageName) {
      firebase.performance.startScreenTrace(props.pageName, props.attributes);
      return () => {
        if (props.pageName) {
          firebase.performance.stopScreenTrace(props.pageName);
        }
      };
    }
  }, [props.pageName, props.attributes]);

  if (props.safeArea === false) {
    return <View className="flex-1" ref={ref} {...props} />;
  }
  return <SafeAreaView className="flex-1" ref={ref} {...props} />;
});
