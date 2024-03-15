import dotenv from 'dotenv'


// if(process.env.NODE_ENV !== 'prod'){
//   const configFile = `./.env.${process.env.NODE_ENV}`
//   dotenv.config({path: configFile})
// }else{
//   dotenv.config()
// }
dotenv.config()

export const envVariables = {
  PORT: process.env.PORT!,
  DB_URL: process.env.MONGODB_STRINGLOCAL!,
  DB_NAME: process.env. DB_NAME!, 
  APP_SECRET: process.env.APP_SECRET!,
}