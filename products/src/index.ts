import express,{ Application, Request, Response, NextFunction} from "express";
import { dbServer } from "./database/db";


const app: Application = express()
const port = 8002;

(async()=> {
  try {

    app.get("/", (req: Request, res:Response, next: NextFunction)=> {
      res.status(200).json({msg: "From Products Service"})
    })

  console.log("Products service running")
  await dbServer()
    app.listen(port, ()=> {
      console.log(`Server listening on ${port}`)
    })
  } catch (error:any) {
    console.log(error)
  }
})()

