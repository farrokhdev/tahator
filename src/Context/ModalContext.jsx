import React, { useContext, createContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  <ModalContext.Provider>{children}</ModalContext.Provider>;
};

// export const useModalContext = () => {
//   return useContext(ModalContext);
// };
