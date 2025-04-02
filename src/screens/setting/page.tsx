import { Alert } from 'react-native';

import { format } from 'date-fns';

import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Switch,
  Button,
  ButtonText,
  PageView,
} from '@components';
import { useI18n } from '@hooks';
import { useSettingPageController } from './controller';

export const SettingPage = () => {
  const { t, NumberFormat, PluralRules, Collator } = useI18n();

  const { isDarkMode, currentLanguage, changeTheme, changeLanguage, signOut } =
    useSettingPageController();

  return (
    <PageView>
      <ScrollView className="px-4">
        <Text>{t('Hello')}</Text>
        <VStack>
          <Text> --- format number ----</Text>
          <Text>{(12345.89).toLocaleString(currentLanguage)}</Text>
          <Text>{NumberFormat().format(12345.89)}</Text>
          <Text>{PluralRules({ type: 'ordinal' }).select(2)}</Text>
          <Text> --- interval ----</Text>
          {[1, 3, 99].map(n => (
            <Text key={n}>
              {t('key1_interval', {
                postProcess: 'interval',
                count: n,
              })}
            </Text>
          ))}
          <Text> --- sort text ----</Text>
          <Text>{['Z', 'a', 'z', 'ä'].sort(Collator().compare)}</Text>
          <Text> --- format date ----</Text>
          <Text>{format(new Date(), 'EEE dd MMM hh:mm aa')}</Text>
        </VStack>
        <HStack className={'items-center gap-4 mt-4'}>
          <Text>{t('change-theme', { ns: 'buttons' })}</Text>
          <Switch size="md" value={isDarkMode} onToggle={changeTheme} />
        </HStack>
        <HStack className={'items-center gap-4 mt-4'}>
          <Text>{t('change-language', { ns: 'buttons' })}</Text>
          <Switch
            size="md"
            value={currentLanguage === 'vi'}
            onToggle={() => {
              const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
              changeLanguage(newLanguage);
            }}
          />
        </HStack>
        <Button
          className="mt-6"
          onPress={() => {
            Alert.alert('SignOut', 'Are you sure?', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              { text: 'OK', onPress: signOut },
            ]);
          }}>
          <ButtonText>SignOut</ButtonText>
        </Button>
      </ScrollView>
    </PageView>
  );
};
