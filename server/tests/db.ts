import mongoose from 'mongoose';

export const connect = async () => {
   try {
      const dbUri = "mongodb+srv://daniel:tBVDqQdDKwEXKRK7@cluster0.dfatese.mongodb.net/?retryWrites=true&w=majority";
      const dbName = "jest";
      await mongoose.connect(dbUri, {
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
