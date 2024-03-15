import { Customer, ICustomerRepository, Address } from "../entity";



export function buildRegisterCustomer(customerRepository: ICustomerRepository){
  return async function registerCustomer(userData: Customer){
    return await customerRepository.CreateCustomer(userData)
  }
}

export function buildGetCustomers(customerRepository: ICustomerRepository){
  return async function getAllCustomers(): Promise<Customer[]>{
    return await customerRepository.FindCustomers()
  }
}
export function buildGetCustomer(customerRepository: ICustomerRepository){
  return async function getACustomer(customerID: string): Promise<Customer>{
    return await customerRepository.FindCustomerById(customerID)
  }
}

export function buildCustomerProfile(customerRepository: ICustomerRepository){
  return async (email: string): Promise<Customer> => {
    const profile = await customerRepository.FindCustomerByEmail(email)
   return profile
  }
}

export function buildAddAddress(customerRepository: ICustomerRepository){
  return async (input: Address)=> {
    return await customerRepository.CreateAddress(input)
   
  }
}

 