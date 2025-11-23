import SignUp from "./pages/Auth/SignUp";
import Success from "./pages/Auth/Successful";
import Failed from "./pages/Auth/Failed";
import Login from "./pages/Auth/Login";
import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<SignUp />} />
          <Route path="home" element={<Home />} />
          <Route path="verification" element={<Success />} />
          <Route path="failed" element={<Failed />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
