import { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';

import {
  createUserCache,
  globalCache,
  GlobalCacheKeys,
  UserCacheKeys,
} from '@data';
import { firebase } from '@services';
import { useAppStore } from '@stores';

export const useAppController = () => {
  const { isLoggedIn, setIsLoggedIn } = useAppStore();

  useEffect(() => {
    const init = async () => {
      await firebase.messaging.requestPermission();
      const result = await checkIsLoggedIn();
      setIsLoggedIn(result);
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, [setIsLoggedIn]);

  const checkIsLoggedIn = async () => {
    const userId = globalCache.get(GlobalCacheKeys.LOGGED_IN_USER_ID);
    if (typeof userId === 'string') {
      const userCache = createUserCache(userId);
      const cacheToken = userCache.get(UserCacheKeys.TOKEN);
      if (cacheToken) {
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  };

  return { isLoggedIn, setIsLoggedIn };
};
