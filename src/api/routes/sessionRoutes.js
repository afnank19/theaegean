// Although this could've been implemented in the user resource
// in order to maintain the RESTful principles, we refer to login operation
// as a session to treat it as a resource

import { Router } from "express";
import * as sessionController from "../controllers/sessionController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { loginSchema } from "../utils/validationSchemas.js";
import { checkUserSessionAuth } from "../middlewares/auth.js";

const router = Router();

// The GET request will get the session on first page load to persist session
router
  .route("/")
  .post(validateRequest(loginSchema), sessionController.loginUser);

router.route("/token").get(checkUserSessionAuth, sessionController.getNewToken);

export default router;
