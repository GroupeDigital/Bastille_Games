import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, modalContent, setModalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};
