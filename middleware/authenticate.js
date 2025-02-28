import UserModel from "../models/UserModel.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";

export default async function authenticate(req, res, next) {
  let { token } = req.cookies;

  const { authorization } = req.headers;
  if (authorization) {
    token = authorization.split(" ")[1];
  }

  if (!token) return next(new ErrorResponse("Not Authenticated", 401));

  try {
    const { userId } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(userId).select("email role");
    if (!user) return next(new ErrorResponse("Not Authenticated", 401));

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// headers: {
//   "Authorization": "Bearer 8o3w47zcnq3847zv53.q34o87vcq4837crt5bq3847trv3.q3847v5bq34"
// }
