import { MongoClient, Collection, Db, Filter, FindOneAndDeleteOptions, FindOneAndUpdateOptions} from "mongodb";
import { envVariables } from "../config/index";


const URL = envVariables.DB_URL
const DB = envVariables.DB_NAME
let clientConnection : Db;

interface DatabaseResponse {
  success: boolean;
  message?: string;
  result?: any;
  data?: any;
}

export const dbServer = async (): Promise<DatabaseResponse> => {
  try {
    const client = await MongoClient.connect(URL)
    clientConnection = client.db(DB) 
    console.log(`DB connection established on ${clientConnection.databaseName}`)
    return { success: true, message: "connect to database " + clientConnection.databaseName };
  } catch (error: any) {
    console.log(error.message)
    return { success: false, message: error };
  }
}

export const insertData = async(collectionName: string, object: {}) :Promise<DatabaseResponse>=> {
try {
  const result = await clientConnection?.collection(collectionName).insertOne(object)
  return { success: true, result };
} catch (error:any) {
  return { success: false, message: error.message };
}
}

export const insertMany = async (collectionName:string, array: any[]): Promise<DatabaseResponse>=> {
  try {
    const result = await clientConnection?.collection(collectionName).insertMany(array)
    return { success: true, result };
  } catch (error:any) {
    return { success: false, message: error.message };
  }
}

export const findData = async (collectionName: string, filter: Filter<any>): Promise<DatabaseResponse>=> {
try {
  const result = await clientConnection?.collection(collectionName).find(filter).toArray()
return{ success: true, result}
} catch (error:any) {
  return {success: false , message: error.message}
}
}

export const findAndSelectData = async (collectionName: string, filter: Filter<any>, select: any) :Promise<DatabaseResponse>=> {
  try {
    const result = await clientConnection?.collection(collectionName).find(filter, select).toArray()
    return {
      success: true, result
    }
  } catch (error: any) {
    return {success: false, message: error.message}
  }
}

export const findOneAndUpdate = async (collectionName: string, filter: Filter<any>, option: FindOneAndUpdateOptions):Promise<DatabaseResponse>=> {
  try {
    const result = await clientConnection?.collection(collectionName).findOneAndUpdate(filter, option)
    return {success: true, result}
  } catch (error:any) {
    return{success: false, message: error.message}
  }
}

export const findOneAndDelete = async (collectionName: string, filter: Filter<any>, option: FindOneAndDeleteOptions):Promise<DatabaseResponse> => {
  try {
    const result = await clientConnection?.collection(collectionName).findOneAndDelete(filter, option)
    return {success: true, result}
  } catch (error:any) {
    return {success: false, message: error.message}
  }
}

