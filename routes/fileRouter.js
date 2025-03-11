import { Router } from "express";
import FileModel from "../models/FileModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";
import addUploadRoute from "../middleware/Upload.js"

const fileRouter = Router();



fileRouter.get("/", getAll(FileModel));
fileRouter.get("/:id", getOneById(FileModel));
fileRouter.post("/", createOne(FileModel));
fileRouter.put("/:id", updateOne(FileModel));
fileRouter.delete("/:id", deleteOne(FileModel));

export default fileRouter;
