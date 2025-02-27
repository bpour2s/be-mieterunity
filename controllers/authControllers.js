import UserModel from '../models/UserModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcrypt';
import signToken from '../utils/signToken.js';
import setAuthCookie from '../utils/setAuthCookie.js';

const userSignup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  /* console.log(req,res); */

  const emailInUse = await UserModel.exists({ email });
  console.log("email in use", emailInUse );
  if (emailInUse) throw new ErrorResponse('Email already in use', 409);

  console.log("hello world");

  const salt = await bcrypt.genSalt();
  const hashedPW = await bcrypt.hash(password, salt);

  console.log(salt);
  console.log(hashedPW);

  const userMongoose = await UserModel.create({ ...req.body, password: hashedPW });
  const user = userMongoose.toObject();
  delete user.password;

  const token = signToken(user._id);

  setAuthCookie(res, token);

  res.status(201).json({ user, token });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select('+password').lean();
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse('Incorrect password', 401);

  delete user.password;
  const token = signToken(user._id);
  setAuthCookie(res, token);

  res.json({ user, token });
});

const userLogout = (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logout successful' });
};

export { userSignup, userLogin, userLogout };