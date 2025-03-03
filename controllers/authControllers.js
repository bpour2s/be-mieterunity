import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import signToken from "../utils/signToken.js";
import setAuthCookie from "../utils/setAuthCookie.js";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const userSignup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email.match(emailPattern)) {
    return res.status(400).json({
      error: "invalid_email",
      message: "Die E-Mail-Adresse ist ungültig.",
    });
  }

  if (!password.match(passwordPattern)) {
    return res.status(400).json({
      error: "invalid_password",
      message:
        "Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten.",
    });
  }

  const emailInUse = await UserModel.exists({ email });

  if (emailInUse) {
    return res.status(409).json({
      error: "email in use",
      message: "Diese E-Mail-Adresse ist bereits registriert.",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPW = await bcrypt.hash(password, salt);

  const userMongoose = await UserModel.create({
    ...req.body,
    password: hashedPW,
  });
  const user = userMongoose.toObject();

  delete user.password;

  const token = signToken(user._id);
  setAuthCookie(res, token);

  res.status(201).json({ user, token });
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password").lean();

  if (!user) throw new ErrorResponse("Incorrect email", 401);

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new ErrorResponse("Incorrect password", 401);

  delete user.password;

  const token = signToken(user._id);

  setAuthCookie(res, token);

  res.json({ user, token });
});

export const userLogout = (req, res) => {
  res.clearCookie("token");

  res.json({ msg: "Logout successful" });
};

export const getMe = (req, res) => {
  const { user } = req;

  res.json({ user });
};

export default { userSignup, userLogin, userLogout, getMe };
