import { Router } from "express";
import AddressModel from "../models/AddressModel.js";
import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

const addressRouter = Router();

addressRouter.get("/", getAll(AddressModel));
addressRouter.get("/:id", getOneById(AddressModel));
addressRouter.post("/", createOne(AddressModel));
addressRouter.put("/:id", updateOne(AddressModel));
addressRouter.delete("/:id", deleteOne(AddressModel));

export default addressRouter;
