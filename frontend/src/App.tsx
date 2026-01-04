import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";

function App() {
  return (
    <>
      {/* toaster */}
      <Toaster/>

      {/* main routes */}
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/login" element={<SignInPage/>}/>
          <Route path="/register" element={<SignUpPage/>}/>

          {/* protected routes */}
          <Route path="/" element={<ChatPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
