import LanguageListJSON from "./data/languageList.json";

export const languageNameDefiner = sym => {
  return LanguageListJSON.languageNames[sym].name;
};

export const currencyDefiner = sym => {
  return LanguageListJSON.languageNames[sym].currency;
};

export const convertionRateDefiner = sym => {
  return LanguageListJSON.convertionRates[currencyDefiner(sym)];
};

export const languageList = () => {
  return Object.keys(LanguageListJSON.languageNames).map(lang => {
    return {
      langCode: lang,
      name: LanguageListJSON.languageNames[lang].name
    };
  });
};
