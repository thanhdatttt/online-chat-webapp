import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Toaster} from "sonner";
import { useEffect } from "react";
import { useThemeStore } from "./stores/theme.store.ts";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import ProtectRoute from "./components/auth/ProtectRoute.tsx";
import OauthSuccess from "./components/auth/OauthSuccess.tsx";

function App() {
  // set theme with stored value
  const {isDark, setTheme} = useThemeStore();
  useEffect(() => {
    setTheme(isDark);
  }, [isDark]);

  return (
    <>
      {/* toaster */}
      <Toaster position="top-right" richColors closeButton/>

      {/* main routes */}
      <BrowserRouter>
        <Routes>
          {/* default */}
          <Route index element={<Navigate to={"/login"} />} />

          {/* public routes */}
          <Route path="/login" element={<SignInPage/>}/>
          <Route path="/register" element={<SignUpPage/>}/>
          <Route path="/oauth/success" element={<OauthSuccess/>} />

          {/* protected routes */}
          <Route element={<ProtectRoute/>}>
            <Route path="/home" element={<ChatPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
