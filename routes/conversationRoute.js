import express from "express";
import { authorization } from "../controllers/auth.js";

import {
  allConversation,
  getConversation,
  createConversation,
} from "../controllers/conversation.js";

const conversationRouter = express.Router();

conversationRouter.route("/get").get(authorization, getConversation);
conversationRouter.route("/create").post(authorization, createConversation);
conversationRouter.route("/all").get(authorization, allConversation);

export default conversationRouter;
