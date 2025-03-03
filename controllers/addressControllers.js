import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

import AddressModel from "../models/AddressModel.js";

import { GeoCodeApi } from "../utils/GeoCodeApi.js";

const getAllAddress = asyncHandler(async (req, res, next) => {
  const addresses = await AddressModel.find().lean();
  res.json({ data: addresses });
});

const getAddressById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const address = await AddressModel.findById(id).lean();
  if (!address) throw new ErrorResponse("Address not found", 404);
  res.json({ data: address });
});

const createAddress = asyncHandler(async (req, res, next) => {
  const { street, houseNr, postalCode, city, country } = req.body;

  const isVerifiedAddress = await GeoCodeApi(
    street,
    houseNr,
    postalCode,
    city,
    country
  );

  if (!isVerifiedAddress) {
    throw new ErrorResponse("Addresse konnte nicht verifiziert werden.", 409);
  }

  

  let foundAddress = null;

  try {
    foundAddress = await AddressModel.find({
      lat: isVerifiedAddress.lat,
      lon: isVerifiedAddress.lon,
    });
  } catch (err) {
    throw new ErrorResponse("Fehler in der Verbindung mit der Datenbank", 400);
  }

  

  if (!foundAddress.length) {
    req.body = {
      ...req.body,
      lat: isVerifiedAddress.lat,
      lon: isVerifiedAddress.lon,
    };

    

    try {
      const address = await AddressModel.create(req.body);

      

      res.status(201).json({ data: address });
      return;
    } catch (err) {
      throw new ErrorResponse(
        "Fehler in der Verbindung mit der Datenbank",
        400
      );
    }
  }

  res.status(200).json({ data: foundAddress });
});

const updateAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const address = await AddressModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: address });
});

const deleteAddress = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const address = await AddressModel.findByIdAndDelete(id);
  if (!address) throw new ErrorResponse("Address not found", 404);
  res.json({ msg: `Successfully deleted`, data: address });
});

export {
  getAllAddress,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
};
