import { Router } from "express";
import ReactionModel from "../models/ReactionModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

const reactionRouter = Router();

reactionRouter.get("/", getAll(ReactionModel));
reactionRouter.get("/:id", getOneById(ReactionModel));
reactionRouter.post("/", createOne(ReactionModel));
reactionRouter.put("/:id", updateOne(ReactionModel));
reactionRouter.delete("/:id", deleteOne(ReactionModel));

export default reactionRouter;
