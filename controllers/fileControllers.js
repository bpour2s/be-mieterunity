import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import FileModel from "../models/FileModel.js";

const getAllFiles = asyncHandler(async (req, res, next) => {
  const files = await FileModel.find().lean();
  res.json({ data: files });
});

const getFileById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const file = await FileModel.findById(id).lean();
  if (!file) throw new ErrorResponse("File not found", 404);
  res.json({ data: file });
});

const createFile = asyncHandler(async (req, res, next) => {
  const file = await FileModel.create(req.body);
  res.status(201).json({ data: file });
});

const updateFile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const file = await FileModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: file });
});

const deleteFile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const file = await FileModel.findByIdAndDelete(id);
  if (!file) throw new ErrorResponse("File not found", 404);
  res.json({ msg: `Successfully deleted`, data: file });
});

export default { getAllFiles, getFileById, createFile, updateFile, deleteFile };
