import * as userService from "../services/userService.js";

// This functionality may be removed
export const getAllUsers = async (req, res) => {
  console.log("UNIMPLEMENTED: Gets all users");

  const result = await userService.fetchAllUsers();

  res.json(result);
};

export const getAUser = async (req, res) => {
  console.log("UNIMPLEMENTED: Gets a users for profile");
  const userId = req.params.userId;

  const result = await userService.fetchAUser(userId);

  res.json(result);
};

export const registerAUser = async (req, res) => {
  console.log(
    "UNIMPLEMENTED: Registers a user, and provides them with the tokens"
  );

  const bodyData = req.body;

  const newUserId = await userService.createUser(bodyData);

  // TODO: Add authentication afterwards with the id with JWTs

  res.json({ id: newUserId }); // temp
};
