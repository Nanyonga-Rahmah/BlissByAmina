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