import React, { useReducer } from "react";

import {
  languageNameDefiner,
  currencyDefiner,
  convertionRateDefiner,
  languageList
} from "./actions";

const initialState = {
  langCode: "en",
  langName: languageNameDefiner("en"),
  currency: currencyDefiner("en"),
  convertionRate: convertionRateDefiner("en")
};

export const LanguageLists = languageList();

export const I18nContext = React.createContext(initialState);

export const I18nContextProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "languageChange":
        return {
          ...state,
          langCode: action.payload,
          langName: languageNameDefiner(action.payload),
          currency: currencyDefiner(action.payload),
          convertionRate: convertionRateDefiner(action.payload)
        };
      case "testType":
        return {
          ...state,
          test: "It is working"
        };
      default:
        return { ...initialState };
    }
  };

  const [state, dispatchAvetti] = useReducer(reducer, initialState);

  return (
    <I18nContext.Provider value={{ ...state, dispatchAvetti }}>
      {children}
    </I18nContext.Provider>
  );
};
