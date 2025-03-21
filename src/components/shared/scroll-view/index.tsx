'use client';

import React from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { ScrollView as RNGHScrollView } from 'react-native-gesture-handler';

type Props = React.ComponentProps<typeof KeyboardAwareScrollView>;

export const ScrollView: React.ForwardRefExoticComponent<Props> =
  React.forwardRef((props, ref) => {
    return (
      <KeyboardAwareScrollView
        ScrollViewComponent={RNGHScrollView}
        ref={ref}
        {...props}
      />
    );
  });
