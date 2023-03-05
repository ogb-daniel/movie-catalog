import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import Movie from '../models/movie'
dotenv.config()
class Database {
   private static _database: Database
   private constructor() {
      const dbUrl = process.env.CONNECTION_URL
         if(dbUrl) {
            mongoose.connect(dbUrl)
               .then(() => {
                  console.log('Connected with database')

               })
               .catch(() => console.log('Not connected with database'))
         }  
   }
   static getInstance() {
      if (this._database) {
         return this._database
      }
      this._database = new Database()
      return this._database = new Database()
   }
}
export default Database
