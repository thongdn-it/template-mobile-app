'use client';

import React, { forwardRef } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ScrollView as RNGHScrollView } from 'react-native-gesture-handler';

type Props = React.ComponentProps<typeof KeyboardAwareScrollView>;

export const ScrollView = forwardRef<RNGHScrollView, Props>((props, ref) => {
  return (
    <KeyboardAwareScrollView
      ScrollViewComponent={RNGHScrollView}
      ref={ref}
      {...props}
    />
  );
});
