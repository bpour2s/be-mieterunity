import { Router } from "express";
import ThreadModel from "../models/ThreadModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

const threadRouter = Router();

threadRouter.get("/", getAll(ThreadModel));
threadRouter.get("/:id", getOneById(ThreadModel));
threadRouter.post("/", createOne(ThreadModel));
threadRouter.put("/:id", updateOne(ThreadModel));
threadRouter.delete("/:id", deleteOne(ThreadModel));

export default threadRouter;
