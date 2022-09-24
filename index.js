import express from "express";
import cors from "cors";
import { connects } from "./database/setup.js";
import userRouter from "./routes/userRoute.js";
import conversationRouter from "./routes/conversationRoute.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/conversation", conversationRouter);

async function starts() {
  try {
    await connects();
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (e) {
    console.log(e);
  }
}
starts();
