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
    <div className="flex mx-16 flex-col my-10 gap-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="font-bold text-3xl">
          {pathname === "/" ? "Hair Accessories" : "Other Hair Accessories"}
        </h3>{" "}
      </div>
      <div className="grid grid-cols-3 gap-5">
        {products.length === 0 && !loading && (
          <p className="text-center font-bold  col-span-3 py-8 ">
            No products provided at the moment
          </p>
        )}
        {products.map((product, index) => (
          <div className="relative">
            <div className="absolute -top-4  left-1/2 -translate-x-1/2 w-4/5">
              <div className="relative bg-[#3F3F46] text-white flex items-center justify-between gap-3 py-2 px-8">
                <div className="h-1.5 w-1.5 bg-white rounded-full shrink-0" />
                <span className="text-sm font-medium">{product.name}</span>
                <div className="h-1.5 w-1.5 bg-white rounded-full shrink-0" />

                <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 h-5 w-5 bg-[#3F3F46] rounded-full" />
                <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 h-5 w-5 bg-[#3F3F46] rounded-full" />
              </div>
            </div>

            <div
              className="rounded-[20px]  border border-[#E4E4E7] overflow-hidden  bg-[#FAFAFA] "
              key={index}
            >
              <div className="md:h-[220px] w-full rounded-md overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.images?.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {product.images.slice(1, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-14 h-14 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center px-4">
                <p className="text-[#71717A] font-normal text-lg mt-2">
                  {product.description}
                </p>
                {product.price ? (
                  <p className="font-bold text-[#18181B] ">{product.price?.toLocaleString()} SEK</p>

                ):""}
              </div>
              <Button
                className="rounded-4xl mt-3 w-[95%] cursor-pointer m-4 border-[#18181B]"
                variant={"outline"}
                onClick={() => HandleClick(product.id ?? 0)}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;
