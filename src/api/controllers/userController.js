import { AegeanError } from "../middlewares/errorHandler.js";
import * as userService from "../services/userService.js";
import { generateNewTokens } from "../services/sessionService.js";
import { generateHashAndSalt } from "../utils/authHelpers.js";

// This functionality may be removed
export const getAllUsers = async (req, res, next) => {
  console.log("UNIMPLEMENTED: Gets all users");

  const result = await userService.fetchAllUsers();

  res.json(result);
};

/**
 * Takes a user id and calls a user service function to fetch the user
 * data and sends it back
 *
 * @param {*} req.params.id - user id from the route parameters
 * @param {*} res - express response object
 * @param {*} next - middleware func to call with error on error
 */
// TODO: Add authorization to match tokenID with params
export const getAUser = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new AegeanError("No parameter provided", 400);
    }

    const userId = req.params.id;

    const result = await userService.fetchAUser(userId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Gets a users saved blogs by calling the respective service with the userId from the params
 *
 * @param {*} req.query - can contain or not contain lastDocId which can be used as a cursor for pagination
 * @param {*} res
 * @param {*} next
 */
export const getUserSavedBlogs = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new AegeanError("No parameter provided", 400);
    }

    const userId = req.params.id;

    const { lastDocId } = req.query; // Send request even if undefined

    const result = await userService.fetchUserSavedBlogs(userId, lastDocId);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * This function deconstructs the user data from req.body, takes the password and
 * hashes it using bcrpyt, then creates a new userData object with the hash,
 * and calls the service for creating a usre with that userData
 * This returns the newly formed users id, which is then sent to
 * a function as params to create JWT tokens for auth.
 * The tokens are set in a cookie and payload respectively and returned
 *
 * @param {*} req.body - contains all parameters required to register a user
 * @param {*} res - express response object
 * @param {*} next - middleware function to be called with error param on error
 */
export const registerAUser = async (req, res, next) => {
  try {
    // This body needs to be validated against a schema [X]
    const { name, email, password, campus, cms } = req.body;

    const userExists = await userService.fetchAUserByEmail(email);

    // console.log(userExists);
    if (userExists) {
      throw new AegeanError("User already exists for current email", 500);
    }
    // TODO: Add password salting, hashing, and add salt field to
    // userData [X]
    const hash = await generateHashAndSalt(password);
    const userData = {
      name: name,
      email: email,
      hash: hash,
      campus: campus,
      cms: cms,
    };
    const newUserId = await userService.createUser(userData);

    // TODO: Add authentication afterwards with the id with JWTs
    // to send the tokens back to the user [X]
    const tokens = generateNewTokens({ newUserId, name });

    res.cookie("refreshToken", tokens.rToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    // TODO: Send AToken directly to the user, not in the cookie [X]
    // TODO: Generate an anti CSRF token and send on login
    // TODO: Send Id aswell dummy [X]
    // Current impl only for dev, CSRF token may be RNG or signed JWT which could be refreshed
    const payload = {
      id: newUserId,
      aTkn: tokens.aToken,
      r_surf: "okl",
    };

    res.json(payload);
  } catch (error) {
    next(error);
  }
};
