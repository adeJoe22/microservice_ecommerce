import { NextFunction, Request, Response } from "express";
import { validateSignature } from "../utils";
import { AuthPayload } from "../dto";

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthPayload;
  }
}

export const Authenticate = async (req: Request, res: Response,  next: NextFunction)=> {
  const validate = await validateSignature(req)

  if(validate){
    next()
  }else{
    return res.json({message: "User not authorized"})
  }
}