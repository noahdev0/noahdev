import mongoose, { ConnectOptions, Connection } from "mongoose";

const connectToDatabase = async (): Promise<Connection | undefined> => {
  const uri = process.env.MONGODB_URI;

  try {
    if (!uri) {
      throw new Error("MONGODB_URI is undefined");
    }

    // Connect only if the connection is not already established
    if (mongoose.connection.readyState === 0) {
      const connection = await mongoose.connect(uri, {
        dbName: process.env.MONGODB_DB,
      } as ConnectOptions);

      console.log("Connected to the database");
      return connection.connection;
    } else {
      console.log("Already connected to the database");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default connectToDatabase;
