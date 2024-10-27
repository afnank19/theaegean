import { fetchAUserByEmail } from "../services/userService.js";

export const loginUser = async (req, res, next) => {
  try {
    const error = new Error("bruh");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }

  //   const { userEmail, userPassword } = req.body;

  //   const user = fetchAUserByEmail(userEmail);

  // Implement logic to hash provided pass with returned salt and strcmp with
  // Hash from DB
};
