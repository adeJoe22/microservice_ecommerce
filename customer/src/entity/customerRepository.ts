import { Address } from "./Address"
import { Cart, Customer, Wishlist } from "./Customer"

export interface ICustomerRepository  {
   CreateCustomer(input: Customer): Promise<any>
   CreateAddress (input: Address): Promise<any>
   FindCustomers (): Promise<Customer[]>
   FindCustomerById (customerID:string): Promise<Customer>
   FindCustomerByEmail (email: string): Promise<Customer>
   AddWishList(customerID: string, item: Wishlist): Promise<{}>
   GetWishList(customerID: string): Promise<{}>
   AddCartItem (customerID: string, item: Cart, qty: number, isRemove: boolean): Promise<{}>
 
}