import express from "express";
import {
  getMessage,
  createMessage,
  deleteMessage,
} from "../controllers/message.js";
import { authorization } from "../controllers/auth.js";
const messageRouter = express.Router();

messageRouter.route("/getall").get(authorization, getMessage);
messageRouter.route("/create/:reciever").post(authorization, createMessage);
messageRouter.route("/delete/:reciever").delete(authorization, deleteMessage);

export default messageRouter;
