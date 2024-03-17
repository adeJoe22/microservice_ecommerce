export interface CustomerPayload {
  email: string;
  _id: string;
  phone: string;
}

export type AuthPayload = CustomerPayload;
