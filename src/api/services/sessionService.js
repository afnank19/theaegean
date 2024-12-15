import { createAndSignTokens } from "../utils/authHelpers.js";

export const generateNewTokens = ({ id, name }) => {
  const payload = { id: id, name: name };

  const tokens = createAndSignTokens(payload);

  return tokens;
};
