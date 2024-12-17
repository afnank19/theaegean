import express, { json } from "express";
import loadRoutes from "./src/config/routeLoader.js";
import { errorHandler } from "./src/api/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { basicLimiter } from "./src/api/middlewares/rateLimiter.js";

//All express initial middleware to go here
function buildApp() {
  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(json());
  app.use(cookieParser());
  app.use(basicLimiter);

  loadRoutes(app);

  // Always add error handling middleware in the end
  // It's just the way the project is setup
  app.use(errorHandler);

  return app;
}

export default buildApp();
