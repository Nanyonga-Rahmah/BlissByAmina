import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from "./components/ui/sonner";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <>
            <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LandingPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          <Route path="/orders" element={<OrderHistory/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
