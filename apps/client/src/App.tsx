import { Route, Routes as ReactRoutes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";
import { Toaster } from "client/src/@/components/ui/toast/Toaster";
import { Routes } from "./utils";
import { Listings } from "./pages/listings/Listings";
import Navbar from "./components/navbar/Navbar";
import { MyListings } from "./pages/myListings/MyListings";

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <ReactRoutes>
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.SIGN_UP} element={<SignUp />} />
        <Route path={Routes.LISTINGS} element={<Listings />} />
        <Route path={Routes.MY_LISTINGS} element={<MyListings />} />
      </ReactRoutes>
    </>
  );
}

export default App;
