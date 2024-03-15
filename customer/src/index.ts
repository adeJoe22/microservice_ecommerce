import express,{ Application, Request, Response, NextFunction} from "express";
import { expressApp } from "./expressApp";



const app: Application = express()
const port = 4545;

(async()=> {
  try {
 
    expressApp(app)
    console.log("Customer service running")
  
    app.listen(port, ()=> {
      console.log(`Server listening on ${port}`)
    })
  } catch (error:any) {
    console.log(error)
  }
})()

