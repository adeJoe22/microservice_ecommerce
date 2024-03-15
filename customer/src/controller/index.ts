import { Request, Response } from "express"
import { Customer, ICustomerRepository } from "../entity"
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "../utils"
import {  buildCustomerProfile, buildGetCustomer, buildGetCustomers, buildRegisterCustomer } from "../usecases/customerUseCase"

export function buildCustomerController(customerRepository: ICustomerRepository){

  const registerUser = buildRegisterCustomer(customerRepository)
  const getUsers = buildGetCustomers(customerRepository)
  const getUser = buildGetCustomer(customerRepository)
  const userProfile = buildCustomerProfile(customerRepository)

  return Object.freeze({
    createRegisterCustomer : async (req:Request, res: Response)=> {

      const user = <Customer>req.body
     
      const checkExist = await userProfile(user.email)
      if(checkExist !== null){
        return res.status(400).json({message: "User already exist"})
      }
      const salt = await GenerateSalt()
      const genPass = await GeneratePassword(user.password, salt)
    
      try {
        const newUser = {
          email: user.email,
          salt,
          password: genPass,
          phone: user.phone,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          cart: user.cart || [],
          wishList: user.wishList || [],
          orders: user.orders || [],
          address: user.address || []
        }
        
        await registerUser(newUser)
        res.status(201).json({message: "User registered"})
      } catch (error: any) {
        res.status(400).json({error: error.message})
      }
    },

    fetchCustomers : async (req: Request, res: Response)=> {
      try {
        const users = await getUsers()
        const result = users.map(user=> {
          const newUser = {          
            firstName : user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
          
          }
          return newUser
        })
        return res.status(200).json(result)
      } catch (error: any) {
        return res.status(400).json({error: error.message})
      }
    },

    fetchCustomer: async(req: Request, res: Response)=> {
      try {
        const customerID = req.params.customerID
        const user = await getUser(customerID)
        if(!user){
          res.status(404).json({message: "User not found"})
          return
        }
        const {password, salt, ...others} = user
      
        return res.status(200).json(others)
      } catch (error: any) {
        return res.status(400).json({error: error.message})
      }
    },

    loginCustomer : async (req:Request, res: Response)=> {
      try {
        const {email, password} = req.body
        const profile = await userProfile(email)
      
        if(!profile){
          throw new Error("User not found")
        }
        const isPasswordValid = await ValidatePassword(password, profile.password, profile.salt)
      
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
    
        const token = GenerateSignature({email: profile.email, _id: profile.id!, phone: profile.phone})

        return res.status(200).json(token)
      } catch (error: any) {
        return res.status(400).json({error: error.message})
      }
    }
    , 
    createAddress : async ()=> {
      
    }
  })
}