import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import AddressModel from "../models/AddressModel.js";
//import { geocodeAddress } from "../utils/geocode.js";

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


// Neue Adresse erstellen
const createAddress = asyncHandler(async (req, res, next) => {
  const { street, houseNr, postalCode, city, country } = req.body;

  // Überprüfen, ob die Adresse bereits existiert
  const existingAddress = await AddressModel.findOne({
    street,
    houseNr,
    postalCode,
    city,
    country,
  });
   const addressZiel = street + houseNr + postalCode + city + country;
    const addressInUse = await AddressModel.exists({ addressZiel });
    if (addressInUse) throw new ErrorResponse("Address already in use", 409);



  // Geokodierung der Adresse
  const { lat, lon } = await geocodeAddress(street, houseNr, postalCode, city, country);

  // Neue Adresse in der Datenbank speichern
  const newAddress = new AddressModel({
    street,
    compactAddress : street + houseNr + postalCode + city + country,
    houseNr,
    postalCode,
    city,
    country,
    lat,
    lon,
  });

  const savedAddress = await newAddress.save();

  res.status(201).json({
    message: "Adresse erfolgreich erstellt und geokodiert",
    data: savedAddress,
  });
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


