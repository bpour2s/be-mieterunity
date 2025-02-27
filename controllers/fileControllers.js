
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import FileModel from '../models/FileModel.js';

const getAllFiles = asyncHandler(async (req, res, next) => {
  const file = await File.find().lean();
  res.json({ data: file });
});


const getFileById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const file = await File.findById(id).lean();
  if (!file) throw new ErrorResponse('File not found', 404);
  res.json({ data: file });
});

const createFile = asyncHandler(async (req, res, next) => {
  const file = await File.create(req.body);
  res.status(201).json({ data: file });
});

const updateFile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const file = await File.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.json({ msg: 'Update successful', data: file });
});

const deleteFile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const file = await File.findByIdAndDelete(id);
  if (!file) throw new ErrorResponse('File not found', 404);
  res.json({ msg: `Successfully deleted`, data: file });
});


export {
  getAllFiles,
  getFileById,
  createFile,
  updateFile,
  deleteFile,

};
