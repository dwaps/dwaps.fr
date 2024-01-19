import { createContext, useState } from "react";

interface IModalContext {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

export const ModalContext = createContext({} as IModalContext);

export function ModalProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
}
