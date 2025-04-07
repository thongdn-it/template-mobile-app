import { globalCache } from '@/src/data';
import { useAppStore } from '@stores';

export const useSignInPageController = () => {
  const { setIsLoggedIn } = useAppStore();

  const signIn = (email: string, password: string) => {
    // Do some sign in logic
    globalCache.set('token', email + password); // example
    setIsLoggedIn(true);
  };

  return {
    signIn,
  };
};
