import { Router } from "express";
import MessageModel from "../models/MessageModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

import {
  allMessagesFromThreadId,
  allMessagesFromTo,
  createMessages,
  allMessagesFromAndToUserId,
} from "../controllers/messageControllers.js";

const messageRouter = Router();

messageRouter.get(
  "/allMessagesFromAndToUserId/:id/:id",
  allMessagesFromAndToUserId
);
messageRouter.get("/allMessagesFromThreadId/:id", allMessagesFromThreadId);
messageRouter.get(
  "/allMessagesFromTo/:fromUserId/:toUserId",
  allMessagesFromTo
);

messageRouter.get("/", getAll(MessageModel));
messageRouter.get("/:id", createMessages);
messageRouter.post("/", createOne(MessageModel));
messageRouter.put("/:id", updateOne(MessageModel));
messageRouter.delete("/:id", deleteOne(MessageModel));

export default messageRouter;
