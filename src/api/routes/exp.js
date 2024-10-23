// Example code
// TO BE DELETED AFTER EXPERIMENTATION

import express from "express";
import middle from "../middlewares/expMW.js";
import { doExperiment, postExperiment } from "../controllers/expController.js";

const router = express.Router();

router.get("/", middle, doExperiment).post("/", postExperiment);

export default router;
