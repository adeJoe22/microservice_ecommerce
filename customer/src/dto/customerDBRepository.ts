import { Cart, Customer, Wishlist } from '../entity/Customer';
import { Address, ICustomerRepository } from '../entity';
import { ObjectId } from 'mongodb';

export class CustomerDbRepository implements ICustomerRepository {
  constructor(private readonly makeDB: () => Promise<any>) {}

  async CreateCustomer(input: Customer): Promise<any> {
    const db = await this.makeDB();
    return db.collection('customers').insertOne(input);
  }
  async CreateAddress(input: any): Promise<Address> {
    const db = await this.makeDB();
    return db.collection('address').insertOne(input);
  }
  async FindCustomers(): Promise<Customer[]> {
    const db = await this.makeDB();
    return db.collection('customers').find().toArray();
  }
  async FindCustomerById(customerID: string): Promise<Customer> {
    const db = await this.makeDB();
    return db.collection('customers').findOne(new ObjectId(customerID));
  }
  async FindCustomerByEmail(email: string): Promise<Customer> {
    const db = await this.makeDB();
    return db.collection('customers').findOne({ email });
  }

  // async UpdateCustomerById(
  //   customerID: string,
  //   input: Customer
  // ): Promise<Customer> {
  //   const db = await this.makeDB();
  //   return db.collection('customers').findOneAndUpdate(
  //     { _id: new ObjectId(customerID) },
  //     {
  //       $set: { address: input.address },
  //     },
  //     { new: true }
  //   );
  // }

  async AddWishList(customerID: string, item: Wishlist): Promise<{}> {
    throw new Error('Method not implemented.');
  }
  async GetWishList(customerID: string): Promise<{}> {
    throw new Error('Method not implemented.');
  }
  async AddCartItem(
    customerID: string,
    item: Cart,
    qty: number,
    isRemove: boolean
  ): Promise<{}> {
    throw new Error('Method not implemented.');
  }
}
