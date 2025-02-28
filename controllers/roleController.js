import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import RoleModel from "../models/RoleModel.js";

const getAllRoles = asyncHandler(async (req, res, next) => {
  const roles = await RoleModel.find().lean();
  res.json({ data: roles });
});

const getRoleById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const role = await RoleModel.findById(id).lean();
  if (!role) throw new ErrorResponse("Role not found", 404);
  res.json({ data: role });
});

const createRole = asyncHandler(async (req, res, next) => {
  const role = await RoleModel.create(req.body);
  res.status(201).json({ data: role });
});

const updateRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const role = await RoleModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: role });
});

const deleteRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const role = await RoleModel.findByIdAndDelete(id);
  if (!role) throw new ErrorResponse("Role not found", 404);
  res.json({ msg: `Successfully deleted`, data: role });
});

export default { getAllRoles, getRoleById, createRole, updateRole, deleteRole };
