import { createAndSignTokens } from "../utils/authHelpers.js";

export const generateNewTokens = (id) => {
  const payload = { id: id };

  const tokens = createAndSignTokens(payload);

  return tokens;
};
