import React from 'react';

import {
  useTranslation as useI18nTranslation,
  UseTranslationOptions,
} from 'react-i18next';
import { TOptionsBase } from 'i18next';
import IntlPluralRules from 'intl-pluralrules/plural-rules';

import { setDateLocale } from '@/src/utils/date';
import i18n, { Locale, Namespace } from '@/src/utils/i18n';

export const useI18n = () => {
  const [language, setLanguage] = React.useState<Locale>(
    i18n.language as Locale,
  );

  const changeLanguage = (lng: Locale) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setDateLocale(lng);
  };

  const t = (
    key: string | TemplateStringsArray | (string | TemplateStringsArray)[],
    options?:
      | (Omit<TOptionsBase, 'ns'> & { [key: string]: unknown } & {
          ns?: Namespace;
        })
      | undefined,
  ) => {
    return i18n.t(key, options);
  };

  const useTranslation = (
    ns?: Namespace,
    options?: UseTranslationOptions<undefined> | undefined,
  ) => {
    return useI18nTranslation(ns, options);
  };

  const NumberFormat = (options?: Intl.NumberFormatOptions) => {
    return Intl.NumberFormat(language, options);
  };

  const PluralRules = (options?: Intl.PluralRulesOptions) => {
    return new IntlPluralRules(language, options);
  };

  const Collator = (options?: Intl.CollatorOptions) => {
    return Intl.Collator(language, options);
  };

  return {
    currentLanguage: language,
    t,
    changeLanguage,
    useTranslation,

    /**
     * The Intl.NumberFormat object enables language-sensitive number formatting.
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
     */
    NumberFormat,

    /**
     * The Intl.PluralRules object enables plural-sensitive formatting and plural-related language rules.
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules
     *
     * example
     *  ```ts
     *    const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });
     *    console.log(enOrdinalRules.select(0)); // "other" (0th)
     *    console.log(enOrdinalRules.select(1)); // "one"   (1st)
     *  ```
     */
    PluralRules,

    /**
     * The Intl.Collator object enables language-sensitive string comparison.
     *
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator
     *
     * example
     *  ```ts
     *    console.log(["Z", "a", "z", "ä"].sort(new Intl.Collator("en").compare));
     *    // expected output: Array ["a", "ä", "z", "Z"]
     *  ```
     */
    Collator,
  };
};
