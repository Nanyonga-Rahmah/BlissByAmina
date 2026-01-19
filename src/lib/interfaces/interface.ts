export interface IUser {
  id?: number;
  lastName: string;
  firstName: string;
  password: string;
  email: string;
  bookingIds?: number[];
  isVerified?: boolean;
  createdAt: Date;
}

export interface IBooking {
  id?: number;
  name: string;
  bookingDay: string;
  bookingTime: string;
  status: string;
  city:string
  size?:string,
  length?:string,
  bookingFee: string;
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
  image: string;
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