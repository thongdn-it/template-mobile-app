import { useAppStore } from '@stores';

export const useSignInPageController = () => {
  const { setIsLoggedIn } = useAppStore();

  const signIn = () => {
    // Do some sign in logic
    setIsLoggedIn(true);
  };

  return {
    signIn,
  };
};
