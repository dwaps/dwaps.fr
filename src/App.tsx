import { Route, Routes } from "react-router-dom";
import "./firebase.config";
import Home from "./pages/Home";
import { AuthProvider } from "./utils/context/AuthContext";
import { FormProvider } from "./utils/context/FormContext";
import { ModalProvider } from "./utils/context/ModalContext";
import HeaderBar from "./components/HeaderBar";
import { NavigationProvider } from "./utils/context/NavigationContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <FormProvider>
            <NavigationProvider>
              <HeaderBar />
              {/* <FormModal /> */}
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </NavigationProvider>
          </FormProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
