import express from "express";
import {
  getMessage,
  createMessage,
  deleteMessage,
} from "../controllers/message.js";
import { authorization } from "../controllers/auth.js";
const messageRouter = express.Router();

messageRouter.route("/getall/:id").get(authorization, getMessage);
messageRouter.route("/create").post(authorization, createMessage);
messageRouter.route("/delete").delete(authorization, deleteMessage);

export default messageRouter;
