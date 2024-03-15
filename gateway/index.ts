import express,{ Application} from "express";
import cors from 'cors'
import proxy from 'express-http-proxy'

const app: Application = express();
// const port = envVariables.port;


app.use(cors()).use(express.json())

app.use('/customer', proxy("http://localhost:8001"))
app.use('/shopping', proxy("http://localhost:8003"))
app.use('/', proxy("http://localhost:8002")) //product


app.listen(8000, ()=> {
  console.log(`Server listening on ${8000}`)
})

