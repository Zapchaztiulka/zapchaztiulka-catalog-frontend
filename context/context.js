import { createContext, useState } from "react";

export const ModalContext = createContext();

export const Context = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const open = () => setOpenMenu(true);
  const close = () => setOpenMenu(false);
  const toggle = () => setOpenMenu((openMenu) => !openMenu);

  return (
    <ModalContext.Provider value={{ openMenu, open, close, toggle }}>
      {children}
    </ModalContext.Provider>
  );
};