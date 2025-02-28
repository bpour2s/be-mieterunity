import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import ReactionModel from "../models/ReactionModel.js";

const getAllReactions = asyncHandler(async (req, res, next) => {
  const reactions = await ReactionModel.find().lean();
  res.json({ data: reactions });
});

const getReactionById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const reactions = await ReactionModel.findById(id).lean();
  if (!reactions) throw new ErrorResponse("Reaction not found", 404);
  res.json({ data: reactions });
});

const createReaction = asyncHandler(async (req, res, next) => {
  const reaction = await ReactionModel.create(req.body);
  res.status(201).json({ data: reaction });
});

const updateReaction = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const reaction = await ReactionModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: reaction });
});

const deleteReaction = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const reaction = await ReactionModel.findByIdAndDelete(id);
  if (!reaction) throw new ErrorResponse("Reaction not found", 404);
  res.json({ msg: `Successfully deleted`, data: reaction });
});

export default {
  getAllReactions,
  getReactionById,
  createReaction,
  updateReaction,
  deleteReaction,
};
