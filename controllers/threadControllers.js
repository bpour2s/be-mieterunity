import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import ThreadModel from "../models/ThreadModel.js";

const getAllThreads = asyncHandler(async (req, res, next) => {
  const threads = await ThreadModel.find().lean();
  res.json({ data: threads });
});

const getThreadById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const thread = await ThreadModel.findById(id).lean();
  if (!thread) throw new ErrorResponse("Thread not found", 404);
  res.json({ data: thread });
});

const createThread = asyncHandler(async (req, res, next) => {
  const thread = await ThreadModel.create(req.body);
  res.status(201).json({ data: thread });
});

const updateThread = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const thread = await ThreadModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: thread });
});

const deleteThread = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const thread = await ThreadModel.findByIdAndDelete(id);
  if (!thread) throw new ErrorResponse("Thread not found", 404);
  res.json({ msg: `Successfully deleted`, data: thread });
});

export default {
  getAllThreads,
  getThreadById,
  createThread,
  updateThread,
  deleteThread,
};
