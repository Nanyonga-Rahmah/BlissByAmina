import { useEffect, useState, useRef } from "react";
import HeroBanner from "@/components/LandingPage/Banner";
import Navigation from "@/components/header";
import HeroSection from "@/components/LandingPage/hero";
import Services from "@/components/LandingPage/Services";
import Footer from "@/components/Footer";
import Question from "@/components/LandingPage/Question";
import Quote from "@/components/LandingPage/Quote";
import { useServices } from "@/lib/hooks/use-services";
import Accessories from "@/components/LandingPage/HairAccesories";
import { useProducts } from "@/lib/hooks/use-products";

function LandingPage() {
  const { services, loading } = useServices();


  const { products, loading: productsLoading } = useProducts();



  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const visibleServices = services?.slice(0, visibleCount) || [];

  const hasMore = (services?.length ?? 0) > visibleCount;
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 6);
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, services]);

  return (
    <div>
      <Navigation />
      <HeroSection />
      <HeroBanner />

      <Services Services={visibleServices} loading={loading} />

      {hasMore && (
        <div ref={loaderRef} className="h-10 flex justify-center items-center">
          <p className="text-gray-400 text-sm">Loading more...</p>
        </div>
      )}

      <Accessories products={products} loading={productsLoading} />

      <Quote />
      <Question />
      <Footer />
    </div>
  );
}

export default LandingPage;
