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

import authenticate from "../middleware/authenticate.js";
import hasPermissions from "../middleware/hasPermissions.js";
import { getAllLocationsFromUserById } from "../controllers/userControllers.js";

const userRouter = Router();

const restricted = [authenticate, hasPermissions("self", "admin")];

userRouter.get("/allLocationsFromUser/:id", getAllLocationsFromUserById);
userRouter.get("/", getAll(UserModel));
userRouter.get("/:id", getOneById(UserModel));
userRouter.post("/", createOne(UserModel));
userRouter.put("/:id", restricted, updateOne(UserModel));
userRouter.delete("/:id", restricted, deleteOne(UserModel));

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/getMe", authenticate, getMe);

export default userRouter;
