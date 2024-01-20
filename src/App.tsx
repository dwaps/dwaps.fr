import { Route, Routes } from "react-router-dom";
import "./firebase.config";
import Home from "./pages/Home";
import { AuthProvider } from "./utils/context/AuthContext";
import { FormProvider } from "./utils/context/FormContext";
import { ModalProvider } from "./utils/context/ModalContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <FormProvider>
            {/* <HeaderBar /> */}
            {/* <FormModal /> */}
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </FormProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
