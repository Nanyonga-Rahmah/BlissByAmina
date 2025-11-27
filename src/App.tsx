import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
