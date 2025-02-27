
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import MassageModel from '../models/MassageModel.js';

const getAllMassages = asyncHandler(async (req, res, next) => {
  const massage = await MassageModel.find().lean();
  res.json({ data: massage });
});

const getMassageById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const massage = await MassageModel.findById(id).lean();
  if (!massage) throw new ErrorResponse('Massage not found', 404);
  res.json({ data: massage });
});

const createMassage = asyncHandler(async (req, res, next) => {
  const massage = await MassageModel.create(req.body);
  res.status(201).json({ data: massage });
});

const updateMassage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const massage = await MassageModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.json({ msg: 'Update successful', data: massage });
});

const deleteMassage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const massage = await MassageModel.findByIdAndDelete(id);
  if (!massage) throw new ErrorResponse('Massage not found', 404);
  res.json({ msg: `Successfully deleted`, data: massage });
});


export {
  getAllMassages,
  getMassageById,
  createMassage,
  updateMassage,
  deleteMassage,

};
