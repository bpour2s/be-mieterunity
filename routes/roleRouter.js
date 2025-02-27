import { Router } from "express";
import RoleModel from "../models/RoleModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

const roleRouter = Router();

roleRouter.get("/", getAll(RoleModel));
roleRouter.get("/:id", getOneById(RoleModel));
roleRouter.post("/", createOne(RoleModel));
roleRouter.put("/:id", updateOne(RoleModel));
roleRouter.delete("/:id", deleteOne(RoleModel));

export default roleRouter;
