import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connects() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Error in connecting", e);
  }
}
