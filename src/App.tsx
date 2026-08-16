import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { prefetchServicesAndProducts } from "./lib/pre-fetch";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const ViewService = lazy(() => import("./pages/ViewService"));
const Services = lazy(() => import("./pages/Services"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const BookingPolicyPage = lazy(() => import("./pages/BookingPolicyPage"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const UserForbidden = lazy(() => import("./pages/UserForbidden"));
const ViewProduct = lazy(() => import("./pages/ViewProduct"));

function RouteFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
    </div>
  );
}

function App() {
  useEffect(() => {
    // Fire both at once: the LandingPage JS chunk and the backend data.
    import("./pages/LandingPage");
    prefetchServicesAndProducts();
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="*" element={<LandingPage />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/service/:id" element={<ViewService />} />
            <Route path="/products/:id" element={<ViewProduct />} />

            <Route path="/services" element={<Services />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/booking" element={<BookingPolicyPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/user-forbidden" element={<UserForbidden />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
