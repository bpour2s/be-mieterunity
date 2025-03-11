import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import MessageModel from "../models/MessageModel.js";
import ThreadModel from "../models/ThreadModel.js";
import UserModel from "../models/UserModel.js";
import ReactionModel from "../models/ReactionModel.js";
import mongoose from "mongoose";

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

export const createMessages = asyncHandler(async (req, res, next) => {
  console.log("REQUEST", req.params);

  try {
    const message = await MessageModel.create(req.body);
  } catch (error) {
    console.log("UserController: CreateMessages", error);

    return res.status(500).json({ data: message, loading: false, error });
  }
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
  console.log("FUNCTION - allMessagesFromThreadId ");
  const { id } = req.params;

  if (!id || id === null || id === "null") {
    console.log("UserController: ERROR-id nicht gefunden");

    return res.status(500).json({
      data: [],
      loading: false,
      error: { msg: "null als Wert bekommen" },
    });
  }

  console.log("UserController: Id gefunden");

  try {
    const messages = await MessageModel.find({
      thread: id,
    })
      .populate({ path: "thread", model: ThreadModel })
      .populate({ path: "fromUserId", model: UserModel })
      .populate({ path: "reactions", model: ReactionModel })
      .sort({ createdAt: 1 }) // Hier sortieren wir nach createdAt in aufsteigender Reihenfolge (älteste zuerst)
      .lean();

    console.log("UserController: ", messages);

    if (!Array.isArray(messages)) {
      return res.status(200).json({
        data: [],
        error: { msg: "no messages found with threadId" },
        loading: [false],
      });
    }
  } catch (error) {
    console.log("UserController: ", error);
    return res.status(500).json({ data: [], loading: false, error });
  }

  console.log("ERFOLG BEI DER THREADID : ", messages);
  res.json({ data: messages || [], loading: false, error });
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

export const allMessagesFromTo = asyncHandler(async (req, res, next) => {
  const { fromUserId, toUserId } = req.params;
  console.log(req.params);

  if (!fromUserId || !toUserId) {
    return next(new ErrorResponse("fromUserId and toUserId are required", 400));
  }

  const messages = await MessageModel.find({
    $or: [
      { fromUserId: fromUserId, toUserId: toUserId },
      { fromUserId: toUserId, toUserId: fromUserId },
    ],
    thread: { $eq: null }, // Nachrichten ohne threadId
  })
    .populate({ path: "fromUserId", model: UserModel })
    .populate({ path: "toUserId", model: UserModel })
    .populate({ path: "reactions", model: ReactionModel })
    .sort({ createdAt: 1 })
    .lean();

  console.log(
    `Messages between ${fromUserId} and ${toUserId} (excluding threads):`,
    messages
  );

  if (!messages || messages.length === 0) {
    return res.json({ data: [] });
  }

  res.json({ data: messages });
});

export default {
  getAllMessages,
  getMessagesById,
  createMessages,
  updateMessages,
  deleteMessages,
  allMessagesFromThreadId,
  allMessagesFromAndToUserId,
};
