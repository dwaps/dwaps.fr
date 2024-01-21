import { createContext, useState } from "react";

interface INavigationContext {
  contactSection: HTMLDivElement | null;
  setContactSection: (contactSection: HTMLDivElement) => void;
}

export const NavigationContext = createContext({} as INavigationContext);

export function NavigationProvider({ children }) {
  const [contactSection, setContactSection] = useState<HTMLDivElement | null>(
    null
  );

  return (
    <NavigationContext.Provider value={{ contactSection, setContactSection }}>
      {children}
    </NavigationContext.Provider>
  );
}
