import { Router } from "express";
import UserModel from "../models/UserModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

import {
  userSignup,
  userLogin,
  userLogout,
  getMe,
} from "../controllers/authControllers.js";

import { allUserInformationsById } from "../controllers/userControllers.js";

import { notFound } from "../controllers/notFoundController.js";

import authenticate from "../middleware/authenticate.js";
import hasPermissions from "../middleware/hasPermissions.js";

const userRouter = Router();

const restricted = [authenticate, hasPermissions("self", "admin")];


userRouter.get("/alluserinformationsbyid/:id", allUserInformationsById);


userRouter.get("/", getAll(UserModel));
userRouter.get("/:id", getOneById(UserModel));
userRouter.post("/", createOne(UserModel));
userRouter.put("/:id", updateOne(UserModel));
userRouter.delete("/:id", deleteOne(UserModel));

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/getMe", authenticate, getMe);
// userRouter.all("/*", notFound);

export default userRouter;
