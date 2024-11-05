import express, { json } from "express";
import loadRoutes from "./src/config/routeLoader.js";
import { errorHandler } from "./src/api/middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

//All express initial middleware to go here
function buildApp() {
  const app = express();

  app.use(json());
  app.use(cookieParser());

  loadRoutes(app);

  // Always add error handling middleware in the end
  // It's just the way the project is setup
  app.use(errorHandler);

  return app;
}

export default buildApp();
