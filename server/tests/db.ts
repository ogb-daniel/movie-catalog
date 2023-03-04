import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connect = async () => {
   try {
      const dbUri = process.env.CONNECTION_URL;
      const dbName = "jest";
      await mongoose.connect(dbUri!, {
        dbName,
        autoCreate: true,
      });
    } catch (error) {
      console.log("DB connect error");
    }
}
export const closeDatabase = async () => {
   try {
      await mongoose.connection.close();
    } catch (error) {
      console.log("DB disconnect error");
    }
}
