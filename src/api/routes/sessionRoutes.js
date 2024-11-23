// Although this could've been implemented in the user resource
// in order to maintain the RESTful principles, we refer to login operation
// as a session to treat it as a resource

import { Router } from "express";
import * as sessionController from "../controllers/sessionController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginSchema } from "../utils/validationSchemas.js";
import {
  checkUserRefreshAuth,
  checkUserSessionAuth,
} from "../middlewares/auth.js";

const router = Router();

// The GET request will get the session on first page load to persist session
// TODO: Bad auth ratelimiting to protect this endpoint
router
  .route("/")
  .post(validateRequest(loginSchema), sessionController.loginUser);

// Refresh token endpoint
router.route("/token").get(checkUserRefreshAuth, sessionController.getNewToken);

export default router;
