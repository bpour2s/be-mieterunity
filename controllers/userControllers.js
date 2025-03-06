import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import UserModel from "../models/UserModel.js";
import AddressModel from "../models/AddressModel.js";
import ThreadModel from "../models/ThreadModel.js";
import FileModel from "../models/FileModel.js";

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find().lean();
  res.json({ data: users });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id).lean();

  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
});

const createUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  res.status(201).json({ data: user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: user });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ msg: `Successfully deleted`, data: user });
});

const getAllLocationsFromUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id).lean();
  if (!user) throw new ErrorResponse("User not found", 404);

  res.json({ data: user.locations });
});

const getUserWithAddresses = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id)
    .populate({ path: "locations", model: AddressModel })
    .lean();

  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
});

const getUserWithAddressesAndThreads = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id)
    .populate({ path: "locations", model: AddressModel })
    .populate({ path: "threads", model: ThreadModel })
    .lean();

  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
});

const getUserWithAddressesAndThreadsAndImages = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findById(id)
      .populate({ path: "locations", model: AddressModel })
      .populate({ path: "threads", model: ThreadModel })
      .populate({ path: "profilImageId", model: FileModel })
      .lean();

    console.log("UserController: ", user);
    if (!user) throw new ErrorResponse("User not found", 404);
    res.json({ data: user });
  }
);

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllLocationsFromUserById,
  getUserWithAddresses,
  getUserWithAddressesAndThreads,
  getUserWithAddressesAndThreadsAndImages,
};
