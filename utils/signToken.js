import jwt from "jsonwebtoken";

export default function signToken(userId) {
  console.log("Token wurde erstellt");
  return jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN + "d",
  });
}
