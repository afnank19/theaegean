import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AegeanError } from "../middlewares/errorHandler.js";

export const createAndSignTokens = (payload) => {
  const aToken = jwt.sign(payload, process.env.A_TOKEN_KEY, {
    expiresIn: "30min",
  });

  const rToken = jwt.sign(payload, process.env.R_TOKEN_KEY, {
    expiresIn: "10d",
  });

  return { aToken, rToken };
};

export const generateHashAndSalt = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new AegeanError("Error occurred when registring", 500);
  }
};

export const verifyPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw new AegeanError("Couldn't verify credentials", 500);
  }
};
