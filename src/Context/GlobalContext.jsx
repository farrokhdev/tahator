import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [lang, setLang] = useState("tr");

  const langugeHandler = (language) => {
    setLang(language);
  };

  return (
    <GlobalContext.Provider value={{ lang, langugeHandler }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
