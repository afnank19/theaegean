import express from "express";
import middle from "../middlewares/expMW.js";
import { doExperiment } from "../controllers/expController.js";

const router = express.Router();

router.get("/", middle, doExperiment);

export default router;
