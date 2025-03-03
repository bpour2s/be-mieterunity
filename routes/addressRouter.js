import { Router } from "express";
import ErrorResponse from "../utils/ErrorResponse.js";
import axios from "axios";
import AddressModel from "../models/AddressModel.js";

import {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/crudFactory.js";

import {
  createAddress,
  updateAddress,
} from "../controllers/addressControllers.js";

const addressRouter = Router();

addressRouter.get("/", getAll(AddressModel));
addressRouter.get("/:id", getOneById(AddressModel));
addressRouter.post("/", createAddress);
addressRouter.put("/:id", updateAddress);
addressRouter.delete("/:id", deleteOne(AddressModel));

export default addressRouter;
