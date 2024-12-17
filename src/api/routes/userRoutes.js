import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  registerUserSchema,
  updateAboutSchema,
} from "../utils/validationSchemas.js";
import { checkUserAuthBasic } from "../middlewares/auth.js";

const router = Router();

// Represents /api/users endpoint
// TODO: Add a Joi schema for validating this POST body [X]
// TODO: This should be protected with bad Auth rate limiting
router
  .route("/")
  .post(validateRequest(registerUserSchema), userController.registerAUser);

// Represents /api/users/[userID] endpoint
// Future ref: maybe add PUT/PATCH for update, and DELETE for deletion
router.route("/:id").get(checkUserAuthBasic, userController.getAUser);

router
  .route("/:id/about")
  .patch(validateRequest(updateAboutSchema), userController.updateUserAbout);

// /api/users/[userID]/saves
router
  .route("/:id/saves")
  .get(checkUserAuthBasic, userController.getUserSavedBlogs);

export default router;
