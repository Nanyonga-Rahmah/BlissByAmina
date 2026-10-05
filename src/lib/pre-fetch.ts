// src/lib/prefetch.ts
import { AllProducts, AllServices } from "./routes";

let cache: Promise<{ services: any[]; products: any[] }> | null = null;

export function prefetchServicesAndProducts() {
  if (!cache) {
    const serviceUrl = AllServices();
    const productUrl = AllProducts();

    cache = Promise.all([
      fetch(serviceUrl)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .catch((err) => {
          console.warn("Failed to fetch services:", err);
          return { services: [] };
        }),
      fetch(productUrl)
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
        .catch((err) => {
          console.warn("Failed to fetch products:", err);
          return { productVariants: [] };
        }),
    ]).then(([servicesRes, productsRes]) => ({
      services: servicesRes?.services ?? [],
      products: productsRes?.productVariants ?? [],
    })).catch((err) => {
      console.warn("Error in prefetchServicesAndProducts:", err);
      return { services: [], products: [] };
    });
  }
  return cache;
}

export function getServicesAndProducts() {
  return cache ?? prefetchServicesAndProducts();
}