import { createAndSignTokens } from "../utils/authHelpers.js";

export const generateNewTokens = (id) => {
  console.log(
    "UNIMPLEMENTED: Generate new token/tokens from a helper function"
  );

  const payload = { id: id };

  const tokens = createAndSignTokens(payload);

  return tokens;
};
