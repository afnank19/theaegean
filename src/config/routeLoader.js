import experimentalRoutes from "../api/routes/exp.js";
import blogRoutes from "../api/routes/blogRoutes.js";

function loadRoutes(app) {
  app.use("/api", experimentalRoutes);
  app.use("/api/blogs", blogRoutes);
}

export default loadRoutes;
