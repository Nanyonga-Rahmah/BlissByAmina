


import type { IProduct } from "@/lib/interfaces/interface";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface AccesoryProps {
  products: IProduct[];
  loading: boolean;
}

function Accessories({ products, loading }: AccesoryProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const HandleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="flex mx-4 md:mx-16 flex-col my-10 gap-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="font-bold text-2xl md:text-3xl text-center">
          {pathname === "/" ? "Hair Accessories" : "Other Hair Accessories"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length === 0 && !loading && (
          <p className="text-center font-bold col-span-full py-8">
            No products provided at the moment
          </p>
        )}

        {products.map((product, index) => (
          <div className="relative" key={product.id ?? index}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4/5 z-10">
              <div className="relative bg-[#3F3F46] text-white flex items-center justify-between gap-3 py-2 px-6 rounded-sm">
                <div className="h-1.5 w-1.5 bg-white rounded-full shrink-0" />
                <span className="text-sm font-medium truncate">{product.name}</span>
                <div className="h-1.5 w-1.5 bg-white rounded-full shrink-0" />

                <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 h-5 w-5 bg-[#3F3F46] rounded-full" />
                <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 h-5 w-5 bg-[#3F3F46] rounded-full" />
              </div>
            </div>

            {/* Product Card */}
            <div className="rounded-[20px] border border-[#E4E4E7] overflow-hidden bg-[#FAFAFA] pt-8 flex flex-col h-full justify-between">
              
              {/* Main Image Container */}
              <div className="w-full bg-red-600 h-56 md:h-64 flex items-center justify-center p-4 bg-white overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="max-h-full w-full object-contain"
                />
              </div>

            
            

              {/* Product Info */}
              <div className="flex justify-between items-center px-4 mt-4 gap-2">
                <p className="text-[#71717A] font-normal text-sm md:text-base line-clamp-2">
                  {product.description}
                </p>
                {product.price && (
                  <p className="font-bold text-[#18181B] whitespace-nowrap">
                    {product.price.toLocaleString()} SEK
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0 mt-3">
                <Button
                  className="rounded-full w-full cursor-pointer border-[#18181B]"
                  variant="outline"
                  onClick={() => HandleClick(product.id ?? 0)}
                >
                  ADD TO CART
                </Button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;