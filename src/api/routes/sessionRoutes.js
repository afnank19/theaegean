// Although this could've been implemented in the user resource
// in order to maintain the RESTful principles, we refer to login operation
// as a session to treat it as a resource

import { Router } from "express";
import * as sessionController from "../controllers/sessionController.js";

const router = Router();

router.route("/").post(sessionController.loginUser);

export default router;
