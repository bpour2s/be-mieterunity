import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import MessageModel from "../models/MessageModel.js";
import ThreadModel from "../models/ThreadModel.js";
import UserModel from "../models/UserModel.js";
import ReactionModel from "../models/ReactionModel.js";

const getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await MessageModel.find().lean();
  res.json({ data: messages });
});

const getMessagesById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await MessageModel.findById(id).lean();
  if (!message) throw new ErrorResponse("Messages not found", 404);
  res.json({ data: message });
});

const createMessages = asyncHandler(async (req, res, next) => {
  const message = await MessageModel.create(req.body);
  res.status(201).json({ data: message });
});

const updateMessages = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await MessageModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: message });
});

const deleteMessages = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await MessageModel.findByIdAndDelete(id);
  if (!message) throw new ErrorResponse("Message not found", 404);
  res.json({ msg: `Successfully deleted`, data: message });
});

export const allMessagesFromThreadId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await MessageModel.find({ thread: id })
    .populate({ path: "thread", model: ThreadModel })
    .populate({ path: "fromUserId", model: UserModel })
    .populate({ path: "reactions", model: ReactionModel })
    .lean();

  console.log("UserController: ", user);
  if (!user) throw new ErrorResponse("User not found", 404);
  res.json({ data: user });
});

export default {
  getAllMessages,
  getMessagesById,
  createMessages,
  updateMessages,
  deleteMessages,
  allMessagesFromThreadId,
};
