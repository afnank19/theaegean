import express, { json } from "express";
import routes from "./src/api/routes/exp.js";
import loadRoutes from "./src/config/routeLoader.js";
import middle from "./src/api/middlewares/expMW.js";
//All express initial middleware to go here
function buildApp() {
  const app = express();

  app.use(json());

  //Example for an auth middleware to be applied to every route
  // app.use(middle);

  loadRoutes(app);

  return app;
}

export default buildApp();
