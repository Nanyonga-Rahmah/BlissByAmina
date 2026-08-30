export const SignUpApi=()=>`${import.meta.env.VITE_BACKEND_URL}/auth/register`

export const LoginInApi=()=>`${import.meta.env.VITE_BACKEND_URL}/auth/login`

export const VerifyApi=()=>`${import.meta.env.VITE_BACKEND_URL}/auth/verify`

export const ResendLink=()=>`${import.meta.env.VITE_BACKEND_URL}/auth/resend-link`

export const UpdateUser=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/users/${id}`

export const VerifyEmail=()=>`${import.meta.env.VITE_BACKEND_URL}/auth/verifyEmail`


export const FetchService=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/services/${id}`

export const FetchVariants=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/serviceVariants/${id}`

export const AllAvailableDays=()=>`${import.meta.env.VITE_BACKEND_URL}/availableDays`

export const AllCities=()=>`${import.meta.env.VITE_BACKEND_URL}/cities`

export const AllServices=()=>`${import.meta.env.VITE_BACKEND_URL}/activeServices`

export const AllRemovalServices=()=>`${import.meta.env.VITE_BACKEND_URL}/getRemovalServices`


export const MakePayment=()=>`${import.meta.env.VITE_BACKEND_URL}/payments/charge`

export const CreateBooking=()=>`${import.meta.env.VITE_BACKEND_URL}/createBooking`

export const UserBookings=(userId:number)=>`${import.meta.env.VITE_BACKEND_URL}/bookings/user/${userId}`

export const CancelBooking=(bookingId:number)=>`${import.meta.env.VITE_BACKEND_URL}/bookings/cancel/${bookingId}`


export const DeleteProduct=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/products/${id}`

export const UpdateProduct=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/products/${id}`

export const CreateProductVariant=()=>`${import.meta.env.VITE_BACKEND_URL}/createProductVariant`

export const CreateProduct=()=>`${import.meta.env.VITE_BACKEND_URL}/createProduct`

export const AllProducts=()=>`${import.meta.env.VITE_BACKEND_URL}/allProductVariants`

export const FetchProduct=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/products/${id}`

export const FetchProductVariant=(id:number)=>`${import.meta.env.VITE_BACKEND_URL}/products/variants/${id}`

export const AddToCart=()=>`${import.meta.env.VITE_BACKEND_URL}/addToCart`

export const FetchUser=(userId:number|undefined)=>`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`

export const FetchCart=(userId:number)=>`${import.meta.env.VITE_BACKEND_URL}/${userId}`