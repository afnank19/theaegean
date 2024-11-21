import jwt from "jsonwebtoken";

export const createAndSignTokens = (payload) => {
  const aToken = jwt.sign(payload, process.env.A_TOKEN_KEY, {
    expiresIn: "2min",
  });

  const rToken = jwt.sign(payload, process.env.R_TOKEN_KEY, {
    expiresIn: "2min",
  });

  return { aToken, rToken };
};
