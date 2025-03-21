import { useCallback } from 'react';

import {
  KeyboardController,
  AndroidSoftInputModes,
  useKeyboardContext,
} from 'react-native-keyboard-controller';
import { useFocusEffect } from '@react-navigation/native';

export const useKeyboardAnimation = () => {
  useFocusEffect(
    useCallback(() => {
      KeyboardController.setInputMode(
        AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
      );

      return () => KeyboardController.setDefaultMode();
    }, []),
  );

  const context = useKeyboardContext();

  return context.animated;
};
