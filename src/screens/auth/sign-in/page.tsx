import React from 'react';

import { useSignInPageController } from './controller';
import { Button, ButtonText, Center, Image, PageView } from '@components';

export const SignInPage = () => {
  const { signIn } = useSignInPageController();

  const _onSignIn = () => {
    signIn();
  };

  return (
    <PageView pageName="SignIn">
      <Center className="flex-1">
        <Image
          source={require('@assets/bootsplash/logo.png')}
          alt="logo"
          width={160}
          height={160}
          className="w-40 h-40"
        />
        <Button onPress={_onSignIn}>
          <ButtonText>Sign In</ButtonText>
        </Button>
      </Center>
    </PageView>
  );
};
