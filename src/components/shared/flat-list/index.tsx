'use client';
import React, { forwardRef } from 'react';
import { FlatListProps, FlatList as RNFlatList } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export const FlatList = forwardRef<RNFlatList<any>, FlatListProps<any>>(
  (props, ref) => {
    return (
      <RNFlatList
        renderScrollComponent={scrollProps => (
          <KeyboardAwareScrollView {...scrollProps} />
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
