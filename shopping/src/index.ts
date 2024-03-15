import express,{ Application, Request, Response, NextFunction} from "express";
import { dbServer } from "./database/db";
import { envVariables } from "./config";


const app: Application = express()
const port = envVariables.PORT;

(async()=> {
  try {

    app.get("/", (req: Request, res:Response, next: NextFunction)=> {
      res.status(200).json({msg: "From Shopping Service"})
    })

  console.log("Shopping service running")
  await dbServer()
    app.listen(port, ()=> {
      console.log(`Server listening on ${port}`)
    })
  } catch (error:any) {
    console.log(error)
  }
})()

