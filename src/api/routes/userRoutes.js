import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Represents /api/users endpoint
router.route("/").post(userController.registerAUser);

// Represents /api/users/[userID] endpoint
// Future ref: maybe add PUT/PATCH for update, and DELETE for deletion
router.route("/:id").get(userController.getAUser);

export default router;
