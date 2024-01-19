import { Route, Routes } from "react-router-dom";
import FormModal from "./components/FormModal";
import HeaderBar from "./components/HeaderBar";
import { ModalProvider } from "./utils/context/ModalContext";
import "./firebase.config";
import Home from "./pages/Home";
import { AuthProvider } from "./utils/context/AuthContext";
import { FormProvider } from "./utils/context/FormContext";

function App() {
  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <FormProvider>
            <HeaderBar />
            <FormModal />
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
