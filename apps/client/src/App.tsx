import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
