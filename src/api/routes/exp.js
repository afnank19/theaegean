// Example code
// TO BE DELETED AFTER EXPERIMENTATION

import express from "express";
import middle from "../middlewares/expMW.js";
import { doExperiment, postExperiment } from "../controllers/expController.js";
import { testSchema } from "../utils/validationSchemas.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { checkUserAuthBasic } from "../middlewares/auth.js";

const router = express.Router();

router
  .get("/", validateRequest(testSchema), doExperiment)
  .post("/", checkUserAuthBasic, postExperiment);

export default router;
