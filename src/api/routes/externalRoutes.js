import { Router } from "express";
import { checkUserAuthBasic } from "../middlewares/auth.js";
import * as externalSvcController from "../controllers/externalSvcController.js";

const router = Router();

router.route("/news").get(externalSvcController.getWorldNews);
router.route("/pexels/search").get(externalSvcController.getPexelsImages);

export default router;
