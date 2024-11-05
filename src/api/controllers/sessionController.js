import { validateUserCredentials } from "../services/userService.js";
import * as sessionService from "../services/sessionService.js";

// TODO: Bad auth ratelimiting
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await validateUserCredentials(email, password);

    // TODO: Generate new tokens from the result [X]
    const tokens = sessionService.generateNewTokens(result);

    // TODO: Improve the security of the cookie ( Same site bullshit )
    // res.cookie("accessToken", tokens.aToken, { httpOnly: false });
    // NOTE: A decision has to be made to scope the rToken to only the
    // session/token endpoint for generating. This way, we wont have to send
    // rToken each req
    res.cookie("refreshToken", tokens.rToken, { httpOnly: true });

    // TODO: Send AToken directly to the user, not in the cookie
    // TODO: Generate an anti CSRF token and send on login
    // Current impl only for dev, CSRF token may be RNG or signed JWT which could be refreshed
    const payload = {
      aTkn: tokens.aToken,
      r_surf: "okl",
    };

    res.json(payload);
  } catch (error) {
    next(error);
  }
};

export const getNewToken = async (req, res, next) => {
  console.log("UNIMPLEMENTED: Get a new token from the session service");

  try {
    // Probably need a userId in the request
    // generateNewTokens();
  } catch (error) {
    next(error);
  }
};
