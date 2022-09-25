import express from "express";
const userRouter = express.Router();
import {
  allUser,
  getUser,
  register,
  updateUser,
  deleteUser,
  login,
  userauth,
} from "../controllers/user.js";
import { authorization } from "../controllers/auth.js";

userRouter.route("/userauth").get(authorization, userauth);
userRouter.route("/alluser").get(allUser);
userRouter.route("/readuser/:email").get(getUser);
userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/updateuser").put(authorization, updateUser);
userRouter.route("/deleteuser").delete(authorization, deleteUser);

export default userRouter;
