import React, { useRef } from 'react';
import { TextInput } from 'react-native';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, MailIcon } from 'lucide-react-native';

import {
  Button,
  ButtonText,
  PageView,
  Spinner,
  FormInput,
  InputSlot,
  InputIcon,
  VStack,
} from '@components';
import { useI18n } from '@hooks';
import { formSchema } from '@constants';
import Logo from '@assets/images/logo.svg';
import { useSignInPageController } from './controller';

export const SignInPage = () => {
  const { signIn } = useSignInPageController();
  const { t } = useI18n();
  const refPasswordField = useRef<TextInput>(null);

  const form = useForm<z.infer<typeof formSchema.signin>>({
    resolver: zodResolver(formSchema.signin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const _onSignIn = (data: z.infer<typeof formSchema.signin>) => {
    signIn(data.email, data.password);
  };

  return (
    <PageView pageName="SignIn">
      <VStack className="flex-1 items-center justify-center gap-4 px-4">
        <Logo style={{ width: 60, height: 60, marginBottom: 16 }} />
        <FormInput
          key="email-input"
          control={form.control}
          className="w-full"
          name="email"
          placeholder={t('email_placeholder')}
          leftIcon={
            <InputSlot className="pl-3">
              <InputIcon as={MailIcon} />
            </InputSlot>
          }
          inputFieldProps={{
            keyboardType: 'email-address',
            returnKeyType: 'next',
            onSubmitEditing: () => {
              refPasswordField.current?.focus();
            },
          }}
        />
        <FormInput
          ref={refPasswordField}
          key="password-input"
          control={form.control}
          className="w-full"
          name="password"
          type="password"
          placeholder={t('password_placeholder')}
          leftIcon={
            <InputSlot className="pl-3">
              <InputIcon as={LockIcon} />
            </InputSlot>
          }
          inputFieldProps={{
            onSubmitEditing: form.handleSubmit(_onSignIn),
          }}
        />
        <Button
          onPress={form.handleSubmit(_onSignIn)}
          className="w-full"
          disabled={!form.formState.isValid || form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Spinner />}
          <ButtonText>{t('signin', { ns: 'buttons' })}</ButtonText>
        </Button>
      </VStack>
    </PageView>
  );
};
