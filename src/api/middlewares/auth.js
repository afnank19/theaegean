import jwt from "jsonwebtoken";
import { AegeanError } from "./errorHandler.js";

// For all resource reqs
export const checkUserAuthBasic = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new AegeanError("Unauthorized", 401);
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    if (accessToken === undefined) {
      throw new AegeanError("No credentials provided", 401);
    }

    const _r_surf = req.headers["x-surf"]; // keep it all small letters, regardles of how headers sent
    validateSurf(_r_surf);

    const decoded = jwt.verify(accessToken, process.env.A_TOKEN_KEY);

    req.id = decoded.id;
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      error = new AegeanError("Expired crendentials", 401);
    }

    next(error);
  }
};

// Specific for GET /session endpoint
export const checkUserSessionAuth = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const rToken = req.headers.authorization.split(" ")[1];
  const _c_hdr = req.headers["x-1time-tkn"];

  try {
    if (_c_hdr == undefined) {
      throw new AegeanError("Improper request credentials", 400);
    }

    // This need to be checked with the actual string in secret env var
    if (_c_hdr != "lou") {
      throw new AegeanError("Couldn't verify request credentials", 401);
    }

    const decoded = jwt.verify(rToken, process.env.R_TOKEN_KEY);

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      error = new AegeanError("Expired credentials, please login again", 401);
    }

    next(error);
  }
};

// Specific for GET /token
export const checkUserRefreshAuth = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const rToken = req.headers.authorization.split(" ")[1];

  const _r_surf = req.headers["x-surf"];

  try {
    validateSurf(_r_surf);

    const decoded = jwt.verify(rToken, process.env.R_TOKEN_KEY);

    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      error = new AegeanError("Expired credentials, please login again", 401);
    }

    next(error);
  }
};

// This can be used where a certain resource is being accessed
// and we want to know if the user making the request is authorized
export const authorizeUserActions = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const targetId = req.params.id;

  try {
    const decoded = jwt.verify(accessToken, process.env.A_TOKEN_KEY);

    if (targetId != decoded.id) {
      throw new AegeanError("Unauthorized access or action", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
// There will probably be different Auth functions for each type
// of request. Lets try to map this out in text
// Basic Resource req, GET, POST, DELETE, PATCHES/PUTs on users/blogs [X]
// +-> We need to check the aTkn and r_surf
// Getting a new session (On page load) [ ]
// +-> Custom Header, rTkn
// Refreshing aTkn [ ]
// +-> Check rTkn, r_surf

const validateSurf = (_r_surf) => {
  if (_r_surf == undefined) {
    throw new AegeanError("Improper request credentials", 400);
  }

  // TODO: Verify against actual secret
  if (_r_surf != "okl") {
    throw new AegeanError("Couldn't verify request credentials", 401);
  }

  return;
};
