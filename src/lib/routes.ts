const BASE = import.meta.env.VITE_BACKEND_URL || "";

export const SignUpApi=()=>`${BASE}/auth/register`

export const LoginInApi=()=>`${BASE}/auth/login`

export const VerifyApi=()=>`${BASE}/auth/verify`

export const ResendLink=()=>`${BASE}/auth/resend-link`

export const UpdateUser=(id:number)=>`${BASE}/users/${id}`

export const VerifyEmail=()=>`${BASE}/auth/verifyEmail`


export const FetchService=(id:number)=>`${BASE}/services/${id}`

export const FetchVariants=(id:number)=>`${BASE}/serviceVariants/${id}`

export const AllAvailableDays=()=>`${BASE}/availableDays`

export const AllCities=()=>`${BASE}/cities`

export const AllServices=()=>`${BASE}/activeServices`

export const AllRemovalServices=()=>`${BASE}/getRemovalServices`


export const MakePayment=()=>`${BASE}/payments/charge`

export const MakeOrderPayment=()=>`${BASE}/payments/orders/charge`


export const CreateBooking=()=>`${BASE}/createBooking`

export const UserBookings=(userId:number)=>`${BASE}/bookings/user/${userId}`

export const CancelBooking=(bookingId:number)=>`${BASE}/bookings/cancel/${bookingId}`

export const UserOrders=(userId:number)=>`${BASE}/orders/user/${userId}`


export const DeleteProduct=(id:number)=>`${BASE}/products/${id}`

export const UpdateProduct=(id:number)=>`${BASE}/products/${id}`

export const CreateProductVariant=()=>`${BASE}/createProductVariant`

export const CreateProduct=()=>`${BASE}/createProduct`

export const AllProducts=()=>`${BASE}/allProductVariants`

export const FetchProduct=(id:number)=>`${BASE}/products/${id}`

export const FetchProductVariant=(id:number)=>`${BASE}/products/variants/${id}`

export const AddToCart=()=>`${BASE}/addToCart`

export const FetchUser=(userId:number|undefined)=>`${BASE}/users/${userId}`

export const FetchCart=(userId:number)=>`${BASE}/${userId}`

export const GetDiscountByCode=(code:string)=>`${BASE}/discountCode/${code}`

export const CreateOrder=()=>`${BASE}/createOrder`

export const CancelOrder=(orderId:number|undefined)=>`${BASE}/cancel-order/${orderId}`

