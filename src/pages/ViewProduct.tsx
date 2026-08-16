import Navigation from "@/components/header";
import { getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";
import { useProducts } from "@/lib/hooks/use-products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accessories from "@/components/LandingPage/HairAccesories";
import { useProductVariants } from "@/lib/hooks/use-productVariant";
import { Star } from "lucide-react";
import { useProduct } from "@/lib/hooks/use-product";

function ViewProduct() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { id } = useParams();
  const token = getUserToken();
  const productId = Number(id);

  const { products, loading } = useProducts();
  const { product } = useProduct({ productId });
  const { variants } = useProductVariants({ productId });

  const filteredProducts = products?.filter(
    (product) => product.id !== productId,
  )??[];
  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, [token]);

  useEffect(() => {
    setSelectedImage(null);
    setQty(1);
  }, [productId]);

  const filteredVariants = (variants ?? []).filter(
    (variant: any) => variant.status === "active",
  );

  const selectedVariant = filteredVariants.find(
    (variant: any) =>
      variant.name === selectedSize && variant.length === selectedLength,
  );

  const sizes = [...new Set(filteredVariants.map((v: any) => v.name))];

  const lengths = [
    ...new Set(
      filteredVariants
        .filter((v: any) => v.name === selectedSize)
        .map((v: any) => v.length)
        .filter(Boolean),
    ),
  ];

  const productImages =
    product?.images && product.images.length > 0
      ? product.images
      : product?.images
        ? [product.images]
        : [];

  const activeImage = selectedImage || product?.images[0];

  const canAddToCart = Boolean(selectedSize && selectedLength && selectedVariant);

  const totalPrice = selectedVariant
    ? (selectedVariant.price * qty).toLocaleString()
    : null;

//   const rating = product?.rating ?? 4;
//   const reviewCount = product?.reviewCount ?? 0;
  const stockLeft = 3;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    // TODO: wire up actual add-to-cart mutation/context
  };

  return (
    <section>
      <Navigation />
      <div className="grid px-10 md:grid-cols-2 md:gap-16 md:px-16 my-10">
        {/* Image column */}
        <div>
          <div className="md:h-[500px] rounded-md overflow-hidden bg-muted">
            {activeImage && (
              <img
                src={activeImage}
                alt={product?.name}
                style={{ objectPosition: "center 50%" }}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>

          {productImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {productImages.map((image: any, index: any) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`h-24 rounded-md overflow-hidden border cursor-pointer ${
                    activeImage === image
                      ? "border-black border-2"
                      : "border-[#E4E4E7]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details column */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-[#18181B] font-bold text-[42px]">
                {product?.name}
              </h3>
              {typeof stockLeft === "number" && stockLeft <= 5 && (
                <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                  ⚠ Only {stockLeft} left
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(4)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                ({5} reviews)
              </span>
            </div>
          </div>

          <p className="text-[#3F3F46] text-base mt-2">
            {product?.description}
          </p>

          <div className="border-t border-[#E4E4E7] my-5" />

          {sizes.length > 0 && (
            <div className="mb-5">
              <h4 className="font-bold mb-2">Type</h4>
              <div className="flex flex-wrap">
                {sizes.map((sizeOption, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSize(sizeOption);
                      setSelectedLength(null);
                    }}
                    className={`border px-4 py-2 mr-2 mb-2 capitalize cursor-pointer rounded-full transition-colors ${
                      selectedSize === sizeOption
                        ? "font-bold border-black"
                        : "font-normal border-[#E4E4E7]"
                    }`}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedSize && lengths.length > 0 && (
            <div className="mb-5">
              <h4 className="font-bold mb-2">Size</h4>
              <div className="flex flex-wrap">
                {lengths.map((lengthOption, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLength(lengthOption ?? "")}
                    className={`border px-6 py-2 mr-2 mb-2 capitalize cursor-pointer rounded-full transition-colors ${
                      selectedLength === lengthOption
                        ? "font-bold border-black"
                        : "font-normal border-[#E4E4E7]"
                    }`}
                  >
                    {lengthOption}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-[#E4E4E7] my-5" />

          <div className="flex items-center justify-between mb-5">
            <span className="text-[#18181B] font-medium text-xl">Amount</span>
            <span className="font-bold text-xl">
              {totalPrice ? `${totalPrice} SEK` : "--"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 border border-[#E4E4E7] rounded-full px-4 py-2">
              <span className="text-sm text-muted-foreground">QTY:</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-lg leading-none cursor-pointer disabled:opacity-40"
                disabled={qty <= 1}
              >
                −
              </button>
              <span className="font-bold w-4 text-center">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="text-lg leading-none cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className="flex-1 bg-black text-white rounded-full py-3 font-medium tracking-wide uppercase text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Add to Cart
            </button>
          </div>

          {!isLoggedIn && (
            <p className="text-sm text-muted-foreground mt-3 text-center">
              You must be logged in to complete your purchase
            </p>
          )}
        </div>
      </div>

      <div className="my-16">
        <Accessories products={filteredProducts} loading={loading} />
      </div>
    </section>
  );
}

export default ViewProduct;