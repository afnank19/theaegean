import { validateUserCredentials } from "../services/userService.js";
import * as sessionService from "../services/sessionService.js";
import { verifyPassword } from "../utils/authHelpers.js";
import { AegeanError } from "../middlewares/errorHandler.js";
import jwt from "jsonwebtoken";

// TODO: Bad auth ratelimiting

/**
 * This takes the email, calls a user service to retrieve the users id, and hash
 * It then calls a verifyPassword function on the provided password and hash
 * for verification, if verified, the new token are generated, a payload is created,
 * cookies are set and sent to the user.
 *
 * @param {*} req.body - contains the email and password for login
 * @param {*} res
 * @param {*} next
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Result is the ID + Hash object of the user
    const result = await validateUserCredentials(email);

    const isMatch = await verifyPassword(password, result.hash);

    if (!isMatch) {
      throw new AegeanError("Credentials did not match", 401);
    }

    // TODO: Generate new tokens from the result [X]
    const tokens = sessionService.generateNewTokens({
      id: result.id,
      name: result.name,
    });

    // TODO: Improve the security of the cookie ( Secure bullshit )
    // res.cookie("accessToken", tokens.aToken, { httpOnly: false });
    // NOTE: A decision has to be made to scope the rToken to only the
    // session/token endpoint for generating. This way, we wont have to send
    // rToken each req
    // Might not go along with the above decision, because honestly,
    // what even is Auth??? What even is security???
    // We need new browser standards :(
    res.cookie("refreshToken", tokens.rToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    // TODO: Send AToken directly to the user, not in the cookie [X]
    // TODO: Generate an anti CSRF token and send on login
    // TODO: Send Id aswell dummy [X]
    // Current impl only for dev, CSRF token may be RNG or signed JWT which could be refreshed
    const payload = {
      id: result.id,
      aTkn: tokens.aToken,
      r_surf: "okl",
    };

    res.json(payload);
  } catch (error) {
    next(error);
  }
};

/**
 * This function decodes the refresh token, gets the id, generates new tokens
 * and sends them back to the user
 * @param {*} req.cookies.refreshToken - refresh token sent by the client to be decoded for id
 * @param {*} res
 * @param {*} next
 */
export const getNewToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const decoded = jwt.verify(refreshToken, process.env.R_TOKEN_KEY);

    const tokens = sessionService.generateNewTokens({
      id: decoded.id,
      name: decoded.name,
    });

    res.cookie("refreshToken", tokens.rToken, { httpOnly: true });

    const payload = {
      id: decoded.id,
      aTkn: tokens.aToken,
    };

    res.json(payload);
  } catch (error) {
    next(error);
  }
};
