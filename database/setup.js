import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connects() {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
  } catch (e) {
    console.log("Error in connecting", e);
  }
}
