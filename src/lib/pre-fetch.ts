// src/lib/prefetch.ts
import { AllProducts, AllServices } from "./routes";

let cache: Promise<{ services: any[]; products: any[] }> | null = null;

export function prefetchServicesAndProducts() {
  if (!cache) {
    cache = Promise.all([
      fetch(AllServices()).then((r) => r.json()),
      fetch(AllProducts()).then((r) => r.json()),
    ]).then(([servicesRes, productsRes]) => ({
      services: servicesRes.services, // unwrap { message, services } -> services[]
      products: productsRes.productVariants, // unwrap { message, products } -> products[]
    }));
  }
  return cache;
}

export function getServicesAndProducts() {
  return cache ?? prefetchServicesAndProducts();
}