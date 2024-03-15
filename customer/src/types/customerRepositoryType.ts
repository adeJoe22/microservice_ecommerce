import { Cart, Customer, Wishlist } from "../entity/Customer"

type CreateCustomer = (input: any)=> Promise<Customer>
type CreateAddress = (input: any)=> Promise<{}>
type FindCustomers = ()=> Promise<Customer[]>
type FindCustomerById = (customerID:string)=> Promise<{}>
type FindCustomerByEmail = (email: string)=> Promise<{}>
type AddWishList = (customerID: string, item: Wishlist)=> Promise<{}>
type GetWishList = (customerID: string)=> Promise<{}>
type AddCartItem = (customerID: string, item: Cart, qty: number, isRemove: boolean)=> Promise<{}>

export type CustomerRepositoryType = {

  register: CreateCustomer
  getCustomers: FindCustomers
  getCustomer: FindCustomerById
  getProfile: FindCustomerByEmail
  addWishlist: AddWishList
  getWishlist: GetWishList
  addToCart: AddCartItem
  addAddress : CreateAddress
}
