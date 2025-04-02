import { Center, Image, PageView } from '@components';

export const SplashPage = () => {
  return (
    <PageView className="flex-1 bg-white dark:bg-black">
      <Center className="flex-1">
        <Image
          source={require('@assets/bootsplash/logo.png')}
          alt="logo"
          width={160}
          height={160}
        />
      </Center>
    </PageView>
  );
};
