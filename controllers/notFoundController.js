import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const notFound = asyncHandler(async (req, res, next) => {
  throw new ErrorResponse("keine Route gefunden", 404);
});

export default notFound;
