import { Router } from "express";
import { checkUserAuthBasic } from "../middlewares/auth.js";
import * as externalSvcController from "../controllers/externalSvcController.js";

const router = Router();

router.route("/news").get(externalSvcController.getWorldNews);

export default router;
