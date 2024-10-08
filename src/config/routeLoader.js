import experimentalRoutes from "../api/routes/exp.js";

function loadRoutes(app) {
  app.use("/api", experimentalRoutes);
}

export default loadRoutes;
