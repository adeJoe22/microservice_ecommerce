import * as Express from 'express';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import amqplib from 'amqplib'
import { envVariables } from "../config"
import { Request } from "express"
import { AuthPayload } from '../dto';




export const GenerateSalt = async ()=> {
  return await bcrypt.genSalt(12)
}

export const GeneratePassword = async (password: string, salt: string)=> {
return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string)=> {
  return await GeneratePassword(enteredPassword, salt) === savedPassword
}

export const GenerateSignature =  (payload: AuthPayload)=> {
  try {
    return jwt.sign(payload, envVariables.APP_SECRET, {expiresIn: "1d"})
  } catch (error: any) {
    console.log(error)
    return error
  }
}

export const validateSignature = async (req: Request & { user?: AuthPayload })=> {
  try {
    const signature = req.get("Authorization")
    const payload = jwt.verify(signature?.split(" ")[1]!, envVariables.APP_SECRET) as AuthPayload

  req.user = payload 

  return true
  } catch (error: any) {
    console.log(error)
  }
}

// export const FormatData = (data: any)=> {
//   if(data){
//     return {data}
//   }else {
//     throw new Error("Data Not found!")
//   }
// }