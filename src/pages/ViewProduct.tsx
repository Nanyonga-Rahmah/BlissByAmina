import Navigation from "@/components/header";
import { getAuthUser, getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";
import { useProducts } from "@/lib/hooks/use-products";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accessories from "@/components/LandingPage/HairAccesories";
import { Star } from "lucide-react";
import { useProduct } from "@/lib/hooks/use-product";
import { AddToCart } from "@/lib/routes";
import { toast } from "sonner";

function ViewProduct() {
  // const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [ ,setAddingToCart] = useState<boolean>(false);

  const { id } = useParams();
  const token = getUserToken();
  const productId = Number(id);

  const { products, loading } = useProducts();
  const { product } = useProduct({ productId });
  // const { variants } = useProductVariants({ productId });

  const filteredProducts = products?.filter(
    (product) => product.id !== productId,
  ) ?? [];
  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, [token]);

  useEffect(() => {
    setSelectedImage(null);
    setQty(1);
  }, [productId]);








  const productImages =
    product?.images && product.images.length > 0
      ? product.images
      : product?.images
        ? [product.images]
        : [];

  const activeImage = selectedImage || product?.images[0];

  // const canAddToCart = Boolean(selectedSize && selectedLength);



  //   const rating = product?.rating ?? 4;
  //   const reviewCount = product?.reviewCount ?? 0;
  const stockLeft = product?.quantity || 1;

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.warning("Please log in to add products to your cart.");
      return;
    }

    if (!product?.id) {
      toast.error("Product not found.");
      return;
    }

    if (qty <= 0) {
      toast.warning("Quantity must be greater than 0.");
      return;
    }

    if (product.quantity !== undefined && qty > product.quantity) {
      toast.warning("Not enough stock available.");
      return;
    }

    const userInfo = getAuthUser()
    const userId = userInfo?.id;

    if (!userId) {
      toast.error("User information not found. Please log in again.");
      return;
    }

    try {
      setAddingToCart(true);

      const response = await fetch(
        AddToCart(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productVariantId: product.id,
            userId: Number(userId),
            quantity: qty,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message || "Failed to add product to cart",
        );
      }

      // const cart = await response.json();

      toast.success("Product added to cart successfully!");

    } catch (error) {
      toast.error("Add to cart error:")
        ;

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart",
      );
    } finally {
      setAddingToCart(false);
    }
  };


  return (
    <section>
      <Navigation />
      <div className="grid px-10 md:grid-cols-2 md:gap-16 md:px-16 my-10">
        {/* Image column */}
        <div>
          <div className="flex md:hidden justify-between my-3">
              {typeof stockLeft === "number" &&  (
                <span className="flex items-center gap-1 bg-[#DC2626] text-white text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
                  ⚠ Only {stockLeft} left
                </span>
              )}
              
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
          <div className="md:h-[500px] rounded-md overflow-hidden ">
            {activeImage && (
              <img
                src={activeImage}
                alt={product?.name}
                className="w-full h-full object-contain object-left "
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
                  className={`h-24 rounded-md overflow-hidden border cursor-pointer mix-blend-multiply ${activeImage === image
                    ? "border-black border-2"
                    : "border-[#E4E4E7]"
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product?.name} ${index + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-[#18181B] font-bold text-[42px]">
                {product?.name}
              </h3>
                 {typeof stockLeft === "number" &&  (
                <span className="hidden md:flex items-center gap-1 bg-[#DC2626] text-white text-[11px] font-medium px-3 py-1 rounded-full whitespace-nowrap">
                  ⚠ Only {stockLeft} left
                </span>
              )}
            
            </div>

            <div className="hidden md:flex items-center gap-1 shrink-0">
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

          <div className="border-t border-[#E4E4E7] my-5 flex " />
          <h4>Type</h4>

          <div className="border border-[#18181B] py-1 px-3 w-max rounded-full my-2">{product?.type}</div>

          <h4>Size</h4>

          <div className="border border-[#18181B] py-1 px-3 w-max rounded-full my-2" >{product?.size}</div>



          <div className="border-t border-[#E4E4E7] my-5" />

          <div className="flex items-center justify-between mb-5">
            <span className="text-[#18181B] font-medium text-xl">Amount</span>
            <span className="font-bold text-xl">
              {product?.price ? `${product.price} SEK` : "--"}
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
                disabled={qty == product?.quantity}
                className="text-lg leading-none cursor-pointer"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              // disabled={!canAddToCart}
              className="w-max px-6 bg-black text-white rounded-full py-3 font-medium tracking-wide uppercase text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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