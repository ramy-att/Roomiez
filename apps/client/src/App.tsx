import { Route, Routes as ReactRoutes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";
import { Toaster } from "client/src/@/components/ui/toast/Toaster";
import { Routes } from "./utils";
import { Main } from "./pages/main/Main";

function App() {
  return (
    <>
      <Toaster />
      <ReactRoutes>
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.SIGN_UP} element={<SignUp />} />
        <Route path={Routes.MAIN} element={<Main />} />
      </ReactRoutes>
    </>
  );
}

export default App;
