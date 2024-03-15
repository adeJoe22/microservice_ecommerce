import express,{ Application, Request, Response, NextFunction} from "express";
import cors from 'cors'
import { customerRouter } from "./routes/customerRouter";

export const expressApp = (app: Application)=> {
app.use(express.json()).use(cors())

app.get("/", (req: Request, res:Response, next: NextFunction)=> {
  res.status(200).json({msg: "From Customer Service"})
})

app.use("/api", customerRouter)


}