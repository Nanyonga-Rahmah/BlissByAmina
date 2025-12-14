import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from "./components/ui/sonner";
import OrderHistory from "./pages/OrderHistory";
import ViewService from "./pages/ViewService";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import BookingPolicyPage from "./pages/BookingPolicyPage";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LandingPage />} />
          <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/service/:id" element={<ViewService />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/booking" element={<BookingPolicyPage />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
