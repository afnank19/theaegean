import express, { json } from "express";
import routes from "./src/api/routes/exp.js";
import loadRoutes from "./src/config/routeLoader.js";
//All express initial middleware to go here
function buildApp() {
  const app = express();

  app.use(json());

  loadRoutes(app);

  return app;
}

export default buildApp();
