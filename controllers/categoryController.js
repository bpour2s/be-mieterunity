import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import CategoryModel from "../models/CategoryModel.js";

const getAllCategories = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.find().lean();
  res.json({ data: category });
});

const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id).lean();
  if (!category) throw new ErrorResponse("Category not found", 404);
  res.json({ data: category });
});

const createCategory = asyncHandler(async (req, res, next) => {
  const category = await CategoryModel.create(req.body);
  res.status(201).json({ data: category });
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.json({ msg: "Update successful", data: category });
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) throw new ErrorResponse("Category not found", 404);
  res.json({ msg: `Successfully deleted`, data: category });
});

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
