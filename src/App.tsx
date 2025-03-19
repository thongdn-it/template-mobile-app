import '../global.css';
import './utils/i18n';

import React, { useCallback } from 'react';
import { ScrollView, StatusBar, SafeAreaView } from 'react-native';

import { format } from 'date-fns';

import { useI18n, useTheme } from '@hooks';
import { AppProvider } from '@src/presentation/providers';
import { Text, HStack, Switch, VStack } from '@components';

function App(): React.JSX.Element {
  const {
    currentLanguage,
    t,
    changeLanguage,
    NumberFormat,
    PluralRules,
    Collator,
  } = useI18n();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const viewFormatNumberAndDate = useCallback(() => {
    console.log('currentLanguage', currentLanguage);
    return (
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
    );
  }, [currentLanguage]);

  return (
    <AppProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView>
        <ScrollView className="px-4">
          <Text>{t('Hello')}</Text>
          {viewFormatNumberAndDate()}
          <HStack className={'items-center gap-4 mt-4'}>
            <Text>{t('change-theme', { ns: 'buttons' })}</Text>
            <Switch
              size="md"
              value={isDarkMode}
              onToggle={() => {
                setTheme(isDarkMode ? 'light' : 'dark');
              }}
            />
          </HStack>
          <HStack className={'items-center gap-4 mt-4'}>
            <Text>{t('change-language', { ns: 'buttons' })}</Text>
            <Switch
              size="md"
              value={currentLanguage == 'vi'}
              onToggle={() => {
                const newLanguage = currentLanguage == 'en' ? 'vi' : 'en';
                changeLanguage(newLanguage);
              }}
            />
          </HStack>
        </ScrollView>
      </SafeAreaView>
    </AppProvider>
  );
}

export default App;
