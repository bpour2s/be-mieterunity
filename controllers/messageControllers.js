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

export const allMessagesFromAndToUserId = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;

    const messages = await MessageModel.find({
      $or: [
        { fromUserId: id, toUserId: id },
        { fromUserId: id }, // falls du auch nur die Nachrichten von dem User haben willst
        { toUserId: id }, // falls du auch nur die Nachrichten an den User haben willst
      ],
    })
      .populate({ path: "fromUserId", model: UserModel })
      .populate({ path: "toUserId", model: UserModel }) // toUserId auch populaten
      .populate({ path: "reactions", model: ReactionModel })
      .sort({ createdAt: 1 }) // Nachrichten nach createdAt in aufsteigender Reihenfolge sortieren (ältestes zuerst)
      .lean();

    console.log("Messages for User ID:", id, messages);

    if (!messages || messages.length === 0) {
      return res.json({ data: [] }); // Leeres Array zurückgeben, wenn keine Nachrichten gefunden werden
    }

    res.json({ data: messages });
  }
);

export default {
  getAllMessages,
  getMessagesById,
  createMessages,
  updateMessages,
  deleteMessages,
  allMessagesFromThreadId,
  allMessagesFromAndToUserId,
};
