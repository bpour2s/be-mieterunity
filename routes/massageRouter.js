import { Router } from "express";
import MessageModel from "../models/MessageModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

const messageRouter = Router();

messageRouter.get("/", getAll(MessageModel));
messageRouter.get("/:id", getOneById(MessageModel));
messageRouter.post("/", createOne(MessageModel));
messageRouter.put("/:id", updateOne(MessageModel));
messageRouter.delete("/:id", deleteOne(MessageModel));

export default messageRouter;
