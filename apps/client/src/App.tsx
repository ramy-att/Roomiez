import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";
import { MainPage } from "./pages/Main-page/main";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
