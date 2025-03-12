import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

  } catch (error) {
    process.exit(1);
  }
};


export default connectDB;
