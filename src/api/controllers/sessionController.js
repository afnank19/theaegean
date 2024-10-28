import { fetchAUserByEmail } from "../services/userService.js";
import { throwErrorInSessionFunc } from "../services/expService.js";
import { AegeanError } from "../utils/errorHandler.js";

export const loginUser = async (req, res, next) => {
  try {
    if (!req.body.username) {
      throw new AegeanError("No body provided", 400);
    }
    const res = await throwErrorInSessionFunc(next);
  } catch (error) {
    next(error);
  }

  //   const { userEmail, userPassword } = req.body;

  //   const user = fetchAUserByEmail(userEmail);

  // Implement logic to hash provided pass with returned salt and strcmp with
  // Hash from DB
};
