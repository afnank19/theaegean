import { AegeanError } from "../middlewares/errorHandler.js";
import * as userService from "../services/userService.js";

// This functionality may be removed
export const getAllUsers = async (req, res, next) => {
  console.log("UNIMPLEMENTED: Gets all users");

  const result = await userService.fetchAllUsers();

  res.json(result);
};

export const getAUser = async (req, res, next) => {
  console.log("UNIMPLEMENTED: Gets a users for profile");
  try {
    if (!req.params.userId) {
      throw new AegeanError("No parameter provided", 400);
    }

    const userId = req.params.userId;

    const result = await userService.fetchAUser(userId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const registerAUser = async (req, res, next) => {
  console.log(
    "UNIMPLEMENTED: Registers a user, and provides them with the tokens"
  );

  try {
    // This body needs to be validated against a schema
    const bodyData = req.body;

    const newUserId = await userService.createUser(bodyData);

    // TODO: Add authentication afterwards with the id with JWTs
    // to send the tokens back to the user
    res.json({ id: newUserId }); // temp
  } catch (error) {
    next(error);
  }
};
