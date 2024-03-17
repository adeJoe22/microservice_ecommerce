export interface Cart {
  product: {
    id: string;
    name: string;
    banner: string;
    price: number;
  };
  unit: number;
}

export interface Wishlist {
  id: string;
  name: string;
  description: string;
  banner: string;
  available: boolean;
  price: number;
}

export interface Order {
  id: string;
  amount: string;
  date: Date;
}

export interface Customer {
  email: string;
  password: string;
  salt: string;
  phone: string;
  firstName: string;
  lastName: string;
  _id?: string;
  // address?: any[];
  cart?: [];
  wishList?: [];
  orders?: [];
}
