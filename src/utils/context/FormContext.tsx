import { createContext, useState } from "react";

interface IFormContext {
  isSignupForm: boolean;
  setIsSignupForm: (yes: boolean) => void;
}

export const FormContext = createContext({} as IFormContext);

export function FormProvider({ children }) {
  const [isSignupForm, setIsSignupForm] = useState(true);
  return (
    <FormContext.Provider value={{ isSignupForm, setIsSignupForm }}>
      {children}
    </FormContext.Provider>
  );
}
