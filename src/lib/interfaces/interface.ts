export interface IUser {
  id?: number;
  lastName: string;
  firstName: string;
  password: string;
  profilePhoto?:string;
  email: string;
  bookingIds?: number[];
  isVerified?: boolean;
  createdAt: Date;
}

export interface IBooking {
  id?: number;
  serviceName: string;
  bookingDay: string;
  bookingTime: string;
  isCanceled: boolean;
  status: string;
  city: string;
  size?: string;
  length?: string;
  userId: number;
  amount: string;
  travelfee?: string;
  servicefee?: string;
  createdAt: Date;
}


export interface ICity {
 id?: number;
 name:string;
 status:string;
 travelFee?:number;
 createdAt?: Date;
  updatedAt?: Date;
  activeBookings?: number;
}


export type TimeSlot = { start: string; end: string };

export interface IAvailableDay{
  id?:number;
  day:string;
  timeSlots:TimeSlot[];
  status:string;
}

export interface IService {
  id?: number;
  name: string;
  image?: string;
    images: string[];

  status: string;
  description: string;
  variants?: number[];
}

export interface IVariant {
  id?: number;
  name: string;
  price: number;
  length?: string;
  status: string;
  serviceId:number;
}


export interface IProduct {
  id?: number;
  name: string;
  price?:number;

  images: string[];
  status: string;
  description: string;

  variants?: number[];
  createdAt: Date;
}
export interface IProductVariant {
  id?: number;
  name:string,
  description:string,
  color: string;
  type: string;
  size: string;
  quantity: number;
  price: number;
  status: string;
  productId: number;
  images: string[];
}