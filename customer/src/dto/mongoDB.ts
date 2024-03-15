import { MongoClient, Db } from "mongodb";

const url = 'mongodb://127.0.0.1:27017'
const dbName = 'microservice_ecommerce'

let dbClient: Db

const makeDB = async ()=> {
  try {
    const client = await MongoClient.connect(url)
    dbClient = client.db(dbName) 
    return dbClient
  } catch (error: any) {
    console.log(error.message)
  }
}

export {makeDB, dbClient}

